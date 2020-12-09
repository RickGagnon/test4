using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Web;


namespace test4.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class LinkConvertController : ControllerBase
    {


        public LinkConvertController()
        {
        }


        [AllowAnonymous]
        [HttpPost]
        public IActionResult Convert([FromBody]Link urle)
        {
            var w = urle.newLink;
            w = w.Trim();

            w = HttpUtility.UrlDecode(w);
            w = w.Replace("BLOCKED","");
            w = w.Replace("[","");
            w = w.Replace("]","");
            w = w.Replace("+", "");
            w = w.Replace("-", "");
            w = w.Replace("%2B", "");
            w = w.Replace("%2D", "");
            w = w.Replace("%2d", "");
            w = w.Replace("%2b", "");
            w = w.Replace(" ", "");


            if (w.EndsWith('.')) w = w.Remove(w.Length - 1, 1);  // had a link that ended with a dot
            Link p = new Link();
            p.newLink = w;
            

            return Ok(p);
        }
        
    }


}

public class Link{
    public string newLink { get; set; }
}