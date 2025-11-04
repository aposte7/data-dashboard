import { useMemo } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

export default function Dashboard() {
  const products = useMemo(() => dummyProducts, []);
  const insights = useMemo(() => computeInsights(products), [products]);

  return (
    <section className="space-y-5 px-10 py-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPI title="Products" value={insights.count} />
        <KPI title="Avg Price" value={insights.avgPriceDisplay} />
        <KPI title="Avg Rating" value={insights.avgRatingDisplay} />
        <KPI title="Categories" value={insights.categoryCount} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Price distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              data={insights.charts.price.data}
              options={insights.charts.price.options}
              height={200}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            <Doughnut
              data={insights.charts.ratings.data}
              options={insights.charts.ratings.options}
              height={200}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top categories</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              data={insights.charts.categories.data}
              options={insights.charts.categories.options}
              height={200}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function KPI({ title, value }) {
  return (
    <Card>
      <CardContent>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-semibold text-gray-900">{value}</div>
      </CardContent>
    </Card>
  );
}

const dummyProducts = [
  {
    id: 1,
    title: "Widget A",
    brand: "Acme",
    category: "Gadgets",
    priceNumber: 19.99,
    rating: 4.2,
  },
  {
    id: 2,
    title: "Widget B",
    brand: "Acme",
    category: "Gadgets",
    priceNumber: 29.99,
    rating: 3.8,
  },
  {
    id: 3,
    title: "Sprocket X",
    brand: "Globex",
    category: "Hardware",
    priceNumber: 49.0,
    rating: 4.6,
  },
  {
    id: 4,
    title: "Doohickey",
    brand: "Initech",
    category: "Accessories",
    priceNumber: 9.5,
    rating: 4.0,
  },
  {
    id: 5,
    title: "Thingamajig",
    brand: "Umbrella",
    category: "Hardware",
    priceNumber: 99.0,
    rating: 4.9,
  },
];

function computeInsights(list) {
  const count = list.length;
  const avg = (arr) =>
    arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
  const avgPrice = avg(list.map((p) => p.priceNumber || 0));
  const avgRating = avg(list.map((p) => p.rating || 0));
  const currency = (n) => `$${n.toFixed(2)}`;
  const unique = (arr) => Array.from(new Set(arr));
  const categoryCount = unique(list.map((p) => p.category)).length;

  // Price buckets for bar chart
  const buckets = [0, 10, 25, 50, 100, 200];
  const labels = ["$0-9", "$10-24", "$25-49", "$50-99", "$100-199", "$200+"];
  const priceCounts = new Array(labels.length).fill(0);
  list.forEach((p) => {
    const price = p.priceNumber || 0;
    const idx =
      price >= 200
        ? 5
        : buckets.findIndex(
            (b, i) => price >= b && price < (buckets[i + 1] || Infinity),
          );
    priceCounts[idx >= 0 ? idx : 0]++;
  });

  // Ratings distribution for doughnut
  const ratingBuckets = [0, 2, 3, 4, 4.5, 5.01];
  const ratingLabels = ["<2", "2-2.9", "3-3.9", "4-4.4", "4.5-5"];
  const ratingCounts = new Array(ratingLabels.length).fill(0);
  list.forEach((p) => {
    const r = p.rating || 0;
    const idx = ratingBuckets.findIndex(
      (b, i) => r >= b && r < ratingBuckets[i + 1],
    );
    // Map idx 1..5 to 0..4; fallback to 0 when not found
    const mapped = idx > 0 ? idx - 1 : 0;
    ratingCounts[mapped]++;
  });

  // Top categories for bar chart
  const catMap = new Map();
  list.forEach((p) =>
    catMap.set(p.category, (catMap.get(p.category) || 0) + 1),
  );
  const topCats = Array.from(catMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return {
    count,
    avgPriceDisplay: currency(avgPrice),
    avgRatingDisplay: avgRating.toFixed(2),
    categoryCount,
    charts: {
      price: {
        data: {
          labels,
          datasets: [
            {
              label: "Count",
              data: priceCounts,
              backgroundColor: "#2563eb",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
        },
      },
      ratings: {
        data: {
          labels: ratingLabels,
          datasets: [
            {
              data: ratingCounts,
              backgroundColor: [
                "#111827",
                "#1f2937",
                "#374151",
                "#4b5563",
                "#6b7280",
              ],
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      },
      categories: {
        data: {
          labels: topCats.map(([c]) => c),
          datasets: [
            {
              label: "Count",
              data: topCats.map(([, n]) => n),
              backgroundColor: "#404040",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
        },
      },
    },
  };
}
