using anevo.app.Models;
using anevo.Models;
using api.allinoneapi.Models;
using api.allinoneapi.Models.Stocks.Polygon;

namespace anevo.app.ViewModels
{
    public class InstrumentsViewModel
    {
        public IEnumerable<StockDescription> StockDescription { get; set; }
        public IEnumerable<Binance_CryptoKandles> Binance_CryptoKandles { get; set; }
        public List<TickersMainPage> TickersMainPage { get; set; }
    }
}
