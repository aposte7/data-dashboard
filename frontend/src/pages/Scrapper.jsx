import { useMemo, useState } from "react";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Textarea from "../components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Loader2, Search } from "lucide-react";

export default function Scrapper() {
  const [input, setInput] = useState("");
  const [bulkMode, setBulkMode] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // Minimal local stub for scraping action
  const mutateAsync = async (payload) => {
    setIsPending(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      const total = (payload?.urls?.length || payload?.asins?.length || 1) ?? 1;
      return { successful: total, total, failed: 0 };
    } finally {
      setIsPending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      alert(
        bulkMode
          ? "Please enter Amazon URLs or ASINs (one per line)"
          : "Please enter an Amazon URL or ASIN",
      );
      return;
    }

    if (bulkMode) {
      // Parse multiple inputs (one per line)
      const inputs = input
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      if (inputs.length === 0) {
        alert("Please enter at least one URL or ASIN");
        return;
      }

      if (inputs.length > 50) {
        alert("Maximum 50 products per batch");
        return;
      }

      const urls = [];
      const asins = [];

      for (const item of inputs) {
        const isUrl = item.includes("amazon.com") || item.includes("amzn.to");
        if (isUrl) {
          // Validate it's not the homepage
          const normalizedUrl = item.toLowerCase().replace(/\/$/, "");
          if (
            normalizedUrl === "https://www.amazon.com" ||
            normalizedUrl === "http://www.amazon.com"
          ) {
            alert(
              "Found Amazon homepage URL - please use specific product URLs only",
            );
            return;
          }
          urls.push(item);
        } else {
          asins.push(item);
        }
      }

      try {
        const result = await mutateAsync({
          urls: urls.length > 0 ? urls : undefined,
          asins: asins.length > 0 ? asins : undefined,
        });

        if (result.successful) {
          alert(
            `Successfully scraped ${result.successful} of ${result.total} products!`,
          );
          if (result.failed > 0) {
            alert(`Failed to scrape ${result.failed} products`);
          }
        }
        setInput("");
      } catch (error) {
        console.error("Bulk scraping error:", error);
        alert("Failed to scrape products. Please try again.");
      }
    } else {
      // Single product mode
      const isUrl = input.includes("amazon.com") || input.includes("amzn.to");

      // Validate it's not just the homepage
      if (isUrl) {
        const normalizedUrl = input.toLowerCase().replace(/\/$/, "");
        if (
          normalizedUrl === "https://www.amazon.com" ||
          normalizedUrl === "http://www.amazon.com"
        ) {
          alert("Please enter a specific product URL, not the Amazon homepage");
          return;
        }
      }

      try {
        await mutateAsync({
          url: isUrl ? input : undefined,
          asin: !isUrl ? input : undefined,
        });

        alert("Product scraped successfully!");
        setInput("");
      } catch (error) {
        console.error("Scraping error:", error);
        alert("Failed to scrape product. Please try again.");
      }
    }
  };

  const bulkCount = useMemo(() => {
    if (!bulkMode) return 0;
    return input
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean).length;
  }, [bulkMode, input]);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          Scrape Products
        </h1>
        <p className="mb-8 text-gray-500">
          Enter Amazon product URLs or ASINs to scrape product information.
        </p>

        <Card>
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-gray-900">Input</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">Mode:</span>
                <div className="flex rounded-md border border-gray-200 p-0.5">
                  <Button
                    type="button"
                    variant={bulkMode ? "outline" : "default"}
                    className="h-8 px-3"
                    onClick={() => setBulkMode(false)}
                    disabled={isPending}
                  >
                    Single
                  </Button>
                  <Button
                    type="button"
                    variant={bulkMode ? "default" : "outline"}
                    className="h-8 px-3"
                    onClick={() => setBulkMode(true)}
                    disabled={isPending}
                  >
                    Bulk
                  </Button>
                </div>
                {bulkMode && (
                  <span className="ml-auto text-xs text-gray-500">
                    {bulkCount} item{bulkCount === 1 ? "" : "s"} detected
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="product-input"
                  className="text-sm font-medium text-gray-900"
                >
                  {bulkMode
                    ? "Amazon Product URLs or ASINs (one per line)"
                    : "Amazon Product URL or ASIN"}
                </label>
                <div className="flex gap-2">
                  {bulkMode ? (
                    <Textarea
                      id="product-input"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={
                        "https://www.amazon.com/dp/B08N5WRWNW\nB08N5WRWNW\nhttps://www.amazon.com/dp/B0D4QFSLP3"
                      }
                      disabled={isPending}
                      className="flex-1 font-mono"
                    />
                  ) : (
                    <Input
                      id="product-input"
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="https://www.amazon.com/... or B08N5WRWNW"
                      disabled={isPending}
                      className="flex-1"
                    />
                  )}
                  <Button type="submit" disabled={isPending} className="h-10">
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Scraping...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Scrape
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  {bulkMode
                    ? "Enter one URL or ASIN per line (max 50)"
                    : "Example: https://www.amazon.com/dp/B08N5WRWNW or just B08N5WRWNW"}
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
