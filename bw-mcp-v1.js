import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { z } from "zod";


export const server = new McpServer({
    name: "builtwith",
    version: "1.0.0",
  });


const BUILTWITH_API_KEY = process.env.BUILTWITH_API_KEY;
const BUILTWITH_API_HOSTNAME = "api.builtwith.com";

var _tools = function (){

    server.tool("domain-lookup",
        "Returns the live web technologies use on the root domain name.",
        {domain:z.string()},
        async({domain})=>{

            const response = await fetch(`https://${BUILTWITH_API_HOSTNAME}/v21/api.json?key=${BUILTWITH_API_KEY}&lookup=${domain}&LIVEONLY=yes`);
            try {
                // Check if response exists before attempting to parse JSON
                if (!response || !response.ok) {
                  console.error("Invalid response received:", response);
                  return {
                    content: [{ type: "text", text: JSON.stringify({ error: "No technologies found" }) }]
                  };
                }
              
                // Parse JSON with error handling
                let data;
                try {
                  data = await response.json();
                } catch (jsonError) {
                  console.error("Failed to parse JSON response:", jsonError);
                  return {
                    content: [{ type: "text", text: JSON.stringify({ error: "No technologies found" }) }]
                  };
                }
              
                // Initialize array to store extracted data
                const extractedData = [];
              
                // Perform nested checks to avoid accessing undefined properties
                if (data && 
                    data.Results && 
                    Array.isArray(data.Results) && 
                    data.Results.length > 0 && 
                    data.Results[0].Result && 
                    data.Results[0].Result.Paths && 
                    Array.isArray(data.Results[0].Result.Paths)) {
                  
                  // Process each path
                  for (const path of data.Results[0].Result.Paths) {
                    if (path && path.Technologies && Array.isArray(path.Technologies)) {
                      for (const tech of path.Technologies) {
                        if (tech) {
                          extractedData.push({
                            Name: tech.Name || "",
                            Description: tech.Description || "",
                            Tag: tech.Tag || "",
                            Link: tech.Link || ""
                          });
                        }
                      }
                    }
                  }
                }
              
                // Return appropriate response based on whether data was found
                if (extractedData.length === 0) {
                  return {
                    content: [{ type: "text", text: JSON.stringify({ error: "No technologies found" }) }]
                  };
                } else {
                  return {
                    content: [{ type: "text", text: JSON.stringify(extractedData) }]
                  };
                }
              } catch (error) {
                // Catch-all for any other errors
                console.error("Unexpected error occurred:", error);
                return {
                  content: [{ type: "text", text: JSON.stringify({ error: "No technologies found" }) }]
                };
              }

            

        });

}



export async function main() {

    _tools();
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("BuiltWith MCP Server running on stdio");
}


main();
  
