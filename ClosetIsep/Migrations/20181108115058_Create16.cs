using Microsoft.EntityFrameworkCore.Migrations;

namespace ClosetIsep.Migrations
{
    public partial class Create16 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContAmax",
                table: "Dimensoes");

            migrationBuilder.DropColumn(
                name: "ContAmin",
                table: "Dimensoes");

            migrationBuilder.DropColumn(
                name: "ContLmax",
                table: "Dimensoes");

            migrationBuilder.RenameColumn(
                name: "DiscP",
                table: "Dimensoes",
                newName: "Pmin");

            migrationBuilder.RenameColumn(
                name: "DiscL",
                table: "Dimensoes",
                newName: "Pmax");

            migrationBuilder.RenameColumn(
                name: "DiscA",
                table: "Dimensoes",
                newName: "Lmin");

            migrationBuilder.RenameColumn(
                name: "ContPmin",
                table: "Dimensoes",
                newName: "Lmax");

            migrationBuilder.RenameColumn(
                name: "ContPmax",
                table: "Dimensoes",
                newName: "Amin");

            migrationBuilder.RenameColumn(
                name: "ContLmin",
                table: "Dimensoes",
                newName: "Amax");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Pmin",
                table: "Dimensoes",
                newName: "DiscP");

            migrationBuilder.RenameColumn(
                name: "Pmax",
                table: "Dimensoes",
                newName: "DiscL");

            migrationBuilder.RenameColumn(
                name: "Lmin",
                table: "Dimensoes",
                newName: "DiscA");

            migrationBuilder.RenameColumn(
                name: "Lmax",
                table: "Dimensoes",
                newName: "ContPmin");

            migrationBuilder.RenameColumn(
                name: "Amin",
                table: "Dimensoes",
                newName: "ContPmax");

            migrationBuilder.RenameColumn(
                name: "Amax",
                table: "Dimensoes",
                newName: "ContLmin");

            migrationBuilder.AddColumn<double>(
                name: "ContAmax",
                table: "Dimensoes",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "ContAmin",
                table: "Dimensoes",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "ContLmax",
                table: "Dimensoes",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
