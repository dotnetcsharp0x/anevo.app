#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using anevo.Models;
using api.allinoneapi.Models.Stocks.Polygon.News;
using api.allinoneapi.Models.Stocks.Polygon;
using api.allinoneapi.Models;

namespace anevo.Data
{
    public class anevoContext : DbContext
    {
        private string connectionString;
        public anevoContext()
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory());
            builder.AddJsonFile("appsettings.json", optional: false);
            var configuration = builder.Build();
            connectionString = configuration.GetConnectionString("anevoContext").ToString();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(connectionString);
        }
        public DbSet<Crypto_Symbols> Crypto_Symbols { get; set; }
        public DbSet<Crypto_Price> Crypto_Price { get; set; }
        public DbSet<Binance_CryptoKandles> CryptoKandles { get; set; }
        public DbSet<StockInstruments> StockInstruments { get; set; }
        public DbSet<StockDescription> StockDescription { get; set; }
        public DbSet<InstrumentsNews> InstrumentsNews { get; set; }
        public DbSet<TickerToNews> TickerToNews { get; set; }
        protected override void ConfigureConventions(
    ModelConfigurationBuilder configurationBuilder)
        {
            configurationBuilder.Properties<decimal>()
                .HavePrecision(20, 10);
        }
        ~anevoContext()
        {
        }
    }
}
