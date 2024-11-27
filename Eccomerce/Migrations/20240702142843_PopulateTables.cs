using Microsoft.EntityFrameworkCore.Migrations;
using System;

#nullable disable

namespace Eccomerce.Migrations
{
    public partial class PopulateTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Insert products
            var productGuids = new[]
            {
                Guid.NewGuid(),
                Guid.NewGuid(),
                Guid.NewGuid(),
                Guid.NewGuid(),
                Guid.NewGuid()
            };

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductId", "Name", "Price", "Rating", "ImageUrl", "Size", "Description", "LongDescription", "Stock", "Departments", "Tags" },
                values: new object[,]
                {
                    { productGuids[0], "Lorem, ipsum dolor.", 100, 5, "images/product/medium-size/1-2.jpg", "[\"S\", \"M\", \"L\"]", "Lorem ipsum dolor sit amet consectetur adipisicing elit..", "Lorem ipsum dolor sit amet consectetur adipisicing elit..", 100, "[\"Bedroom Furniture\", \"Console Table\", \"End Tables\", \"Living Room Sets\", \"Ottomans & Storage Ottomans\", \"Sofas & Couches\", \"TV Stands\"]", "[\"Men\"]" },
                    { productGuids[1], "Lorem, ipsum dolor.", 65, 5, "images/product/medium-size/2-2.jpg", "[\"S\", \"M\", \"L\"]", "Lorem ipsum dolor sit amet consectetur adipisicing elit..", "Lorem ipsum dolor sit amet consectetur adipisicing elit..", 100, "[\"Bedroom Furniture\", \"Console Table\", \"End Tables\", \"Living Room Sets\", \"Ottomans & Storage Ottomans\", \"Sofas & Couches\", \"TV Stands\"]", "[\"Men\"]" },
                    { productGuids[2], "Lorem, ipsum dolor.", 80, 3, "images/product/medium-size/3-2.jpg", "[\"S\", \"M\", \"L\"]", "Lorem ipsum dolor sit amet consectetur adipisicing elit..", "Lorem ipsum dolor sit amet consectetur adipisicing elit..", 100, "[\"Bedroom Furniture\", \"Console Table\", \"End Tables\", \"Living Room Sets\", \"Ottomans & Storage Ottomans\", \"Sofas & Couches\", \"TV Stands\"]", "[\"Men\"]" },
                    { productGuids[3], "Lorem, ipsum dolor.", 55, 4, "images/product/medium-size/4-2.jpg", "[\"S\", \"M\", \"L\"]", "Lorem ipsum dolor sit amet consectetur adipisicing elit..", "Lorem ipsum dolor sit amet consectetur adipisicing elit..", 100, "[\"Bedroom Furniture\", \"Console Table\", \"End Tables\", \"Living Room Sets\", \"Ottomans & Storage Ottomans\", \"Sofas & Couches\", \"TV Stands\"]", "[\"Men\"]" },
                    { productGuids[4], "Lorem, ipsum dolor.", 45, 4, "images/product/medium-size/5-2.jpg", "[\"S\", \"M\", \"L\"]", "Lorem ipsum dolor sit amet consectetur adipisicing elit..", "Lorem ipsum dolor sit amet consectetur adipisicing elit..", 100, "[\"Bedroom Furniture\", \"Console Table\", \"End Tables\", \"Living Room Sets\", \"Ottomans & Storage Ottomans\", \"Sofas & Couches\", \"TV Stands\"]", "[\"Men\"]" }
                }
            );

            // Insert categories
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryId", "Name" },
                values: new object[,]
                {
                    { 1, "Furniture & Decor" },
                    { 2, "Home Accessories" }
                }
            );

            // Insert product categories
            migrationBuilder.InsertData(
                table: "ProductCategories",
                columns: new[] { "ProductId", "CategoryId" },
                values: new object[,]
                {
                    { productGuids[0], 1 },
                    { productGuids[1], 1 },
                    { productGuids[2], 1 },
                    { productGuids[3], 1 },
                    { productGuids[4], 1 },
                    { productGuids[0], 2 },
                    { productGuids[1], 2 },
                    { productGuids[2], 2 },
                    { productGuids[3], 2 },
                    { productGuids[4], 2 }
                }
            );

            // Insert products with countdown
            migrationBuilder.InsertData(
                table: "ProductsWithCountdown",
                columns: new[] { "ProductId", "CountdownStart", "CountdownEnd" },
                values: new object[,]
                {
                    { productGuids[0], new DateTime(2024, 5, 25, 0, 0, 0), new DateTime(2024, 7, 25, 0, 0, 0) },
                    { productGuids[1], new DateTime(2024, 5, 25, 0, 0, 0), new DateTime(2024, 7, 25, 0, 0, 0) },
                    { productGuids[2], new DateTime(2024, 5, 25, 0, 0, 0), new DateTime(2024, 7, 25, 0, 0, 0) },
                    { productGuids[3], new DateTime(2024, 5, 25, 0, 0, 0), new DateTime(2024, 7, 25, 0, 0, 0) },
                    { productGuids[4], new DateTime(2024, 5, 25, 0, 0, 0), new DateTime(2024, 7, 25, 0, 0, 0) }
                }
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
           
        }
    }
}
