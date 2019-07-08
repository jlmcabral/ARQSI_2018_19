using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ClosetIsep.Migrations
{
    public partial class Create8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Dimensoes",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ProdutoId = table.Column<long>(nullable: false),
                    Tipo = table.Column<string>(nullable: true),
                    ContLmax = table.Column<double>(nullable: false),
                    ContLmin = table.Column<double>(nullable: false),
                    ContAmax = table.Column<double>(nullable: false),
                    ContAmin = table.Column<double>(nullable: false),
                    ContPmax = table.Column<double>(nullable: false),
                    ContPmin = table.Column<double>(nullable: false),
                    DiscL = table.Column<double>(nullable: false),
                    DiscA = table.Column<double>(nullable: false),
                    DiscP = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dimensoes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Dimensoes_Produtos_ProdutoId",
                        column: x => x.ProdutoId,
                        principalTable: "Produtos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dimensoes_ProdutoId",
                table: "Dimensoes",
                column: "ProdutoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Dimensoes");
        }
    }
}
