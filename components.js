fetch("https://archive.georgian-speedvale.org/footer.html") 
      .then(response => response.text())
      .then(html => {
        document.getElementById("footer").innerHTML = html;
      })
      .catch(error => {
        console.error("Error loading footer:", error);
      });
fetch("https://www.georgian-speedvale.org/nav.html") 
      .then(response => response.text())
      .then(html => {
        document.getElementById("navbar").innerHTML = html;
      })
      .catch(error => {
        console.error("Error loading navbar:", error);
      });
fetch("https://www.georgian-speedvale.org/logo.html") 
      .then(response => response.text())
      .then(html => {
        document.getElementById("logo").innerHTML = html;
      })
      .catch(error => {
        console.error("Error loading logo:", error);
      });