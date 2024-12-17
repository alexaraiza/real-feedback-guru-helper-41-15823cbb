import FirecrawlApp from '@mendable/firecrawl-js';
import { supabase } from "@/integrations/supabase/client";

interface ErrorResponse {
  success: false;
  error: string;
}

interface CrawlStatusResponse {
  success: true;
  status: string;
  completed: number;
  total: number;
  creditsUsed: number;
  expiresAt: string;
  data: any[];
}

type CrawlResponse = CrawlStatusResponse | ErrorResponse;

export class FirecrawlService {
  private static firecrawlApp: FirecrawlApp | null = null;

  private static async getApiKey(): Promise<string | null> {
    const { data, error } = await supabase
      .from('secrets')
      .select('value')
      .eq('name', 'FIRECRAWL_API_KEY')
      .single();
    
    if (error || !data) {
      console.error('Error fetching Firecrawl API key:', error);
      return null;
    }

    return data.value;
  }

  static async crawlRestaurantWebsite(url: string): Promise<{ success: boolean; error?: string; data?: any }> {
    const apiKey = await this.getApiKey();
    if (!apiKey) {
      return { success: false, error: 'API key not found' };
    }

    try {
      if (!this.firecrawlApp) {
        this.firecrawlApp = new FirecrawlApp({ apiKey });
      }

      const crawlResponse = await this.firecrawlApp.crawlUrl(url, {
        limit: 10,
        scrapeOptions: {
          formats: ['markdown', 'html'],
          elementSelectors: [
            { name: 'name', selector: 'h1, .restaurant-name, [itemprop="name"]' },
            { name: 'description', selector: 'meta[name="description"], .restaurant-description, [itemprop="description"]' },
            { name: 'address', selector: '.address, [itemprop="address"]' },
            { name: 'phone', selector: '.phone, [itemprop="telephone"]' },
            { name: 'cuisine', selector: '.cuisine-type, [itemprop="servesCuisine"]' }
          ]
        }
      }) as CrawlResponse;

      if (!crawlResponse.success) {
        return { 
          success: false, 
          error: (crawlResponse as ErrorResponse).error || 'Failed to crawl website' 
        };
      }

      // Process the crawled data to extract relevant information
      const processedData = this.processRestaurantData(crawlResponse);
      return { 
        success: true,
        data: processedData
      };
    } catch (error) {
      console.error('Error during crawl:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to Firecrawl API' 
      };
    }
  }

  private static processRestaurantData(response: CrawlStatusResponse) {
    const data = response.data[0] || {};
    return {
      name: data.name || '',
      description: data.description || '',
      address: data.address || '',
      cuisine_type: data.cuisine ? [data.cuisine] : [],
    };
  }
}