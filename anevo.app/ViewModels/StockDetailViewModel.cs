using anevo.app.Models;
using api.allinoneapi.Models.Stocks.Polygon;
using api.allinoneapi.Models;

namespace anevo.app.ViewModels
{
    public class StockDetailViewModel
    {
        public IEnumerable<StockDescription> StockDescription { get; set; }
        public IEnumerable<Binance_CryptoKandles> Binance_CryptoKandles { get; set; }
        public List<TickersMainPage> TickersMainPage { get; set; }
    }
}
