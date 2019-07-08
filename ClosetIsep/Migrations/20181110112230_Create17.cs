using Microsoft.EntityFrameworkCore.Migrations;

namespace ClosetIsep.Migrations
{
    public partial class Create17 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Obrigatorio",
                table: "Produtos",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Obrigatorio",
                table: "Produtos");
        }
    }
}
