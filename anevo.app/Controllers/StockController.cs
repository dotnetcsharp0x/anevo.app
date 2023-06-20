using anevo.app.Models;
using anevo.app.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nancy.Json;
using RestSharp;
using System.Text;

namespace anevo.app.Controllers
{
    public class StockController : Controller
    {
        // GET: StockController
        public ActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> Detail(string ticker)
        {
            if (ticker != null)
            {
                StockDetailViewModel ivm;
                string url = "https://api.allinoneapi.app/api/Stock/GetPriceDetailed?limit=1&symbol=" + ticker;
                var client = new RestClient(url);
                var request = new RestRequest(url, Method.Get);
                request.AddHeader("Content-Type", "application/json");
                var r = client.ExecuteAsync(request).Result.Content;
                var Content = new StringContent(r.ToString(), Encoding.UTF8, "application/json");
                JavaScriptSerializer? js = new JavaScriptSerializer();
                var poly_tickers = js.Deserialize<List<TickersMainPage>>(r);
                ivm = new StockDetailViewModel { TickersMainPage = poly_tickers.ToList() };
                Content.Dispose();
                return View(ivm);
            }
            else
            {
                return View(new StockDetailViewModel());
            }
        }

        // GET: StockController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: StockController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: StockController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: StockController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: StockController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: StockController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: StockController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
