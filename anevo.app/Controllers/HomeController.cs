using anevo.app.Models;
using anevo.app.ViewModels;
using anevo.Data;
using api.allinoneapi.Models;
using api.allinoneapi.Models.Stocks.Polygon;
using api.allinoneapi.Models.Stocks.Polygon.News;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nancy.Json;
using RestSharp;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace anevo.app.Controllers
{
    public class HomeController : Controller
    {
        private readonly anevoContext _context;
        public HomeController(anevoContext context)
        {
            _context = context;
        }
        public string ToStringWithSpaces(string number)
        {
            var numStr = number.ToString();
            var len = numStr.Length;
            var result = new StringBuilder();
            for (var i = 0; i < len; i++)
            {
                if (i > 0 && i % 3 == 0) result.Insert(0, " ");
                result.Insert(0, numStr[len - 1 - i]);
            }
            return result.ToString();
        }
        // GET: HomeController
        public async Task<ActionResult> Index()
        {
            InstrumentsViewModel ivm;
            string url = "https://api.allinoneapi.app/api/Stock/GetPriceDetailed?limit=15";
            var client = new RestClient(url);
            var request = new RestRequest(url, Method.Get);
            request.AddHeader("Content-Type", "application/json");
            var r = client.ExecuteAsync(request).Result.Content;
            var Content = new StringContent(r.ToString(), Encoding.UTF8, "application/json");
            JavaScriptSerializer? js = new JavaScriptSerializer();
            var poly_tickers = js.Deserialize<List<TickersMainPage>>(r);
            ivm = new InstrumentsViewModel { TickersMainPage = poly_tickers.ToList() };
            Content.Dispose();
            return View(ivm);
        }

        // GET: HomeController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: HomeController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: HomeController/Create
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

        // GET: HomeController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: HomeController/Edit/5
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

        // GET: HomeController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: HomeController/Delete/5
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
