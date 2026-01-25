fetch("https://flash.greatonthelakes.com/footer.html") 
      .then(response => response.text())
      .then(html => {
        document.getElementById("footer").innerHTML = html;
      })
      .catch(error => {
        console.error("Error loading footer:", error);
      });
fetch("https://www.greatonthelakes.com/nav.html") 
      .then(response => response.text())
      .then(html => {
        document.getElementById("navbar").innerHTML = html;
      })
      .catch(error => {
        console.error("Error loading navbar:", error);
      });
fetch("https://www.greatonthelakes.com/logo.html") 
      .then(response => response.text())
      .then(html => {
        document.getElementById("logo").innerHTML = html;
      })
      .catch(error => {
        console.error("Error loading logo:", error);
      });