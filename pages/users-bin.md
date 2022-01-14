
# Download Hjson

To install the Hjson CLI tool

- Linux

  ```
  # in bash
  GET=$URL/hjson-cli_$VERSION_Linux
  curl -sSLo /usr/local/bin/hjson-cli $GET
  chmod +x /usr/local/bin/hjson-cli
  ```

- macOS & OS X

  ```
  # run in Terminal
  GET=$URL/hjson-cli_$VERSION_macOS
  curl -sSLo /usr/local/bin/hjson-cli $GET
  chmod +x /usr/local/bin/hjson-cli
  ```

- Windows

  [Download](https://github.com/hjson/hjson-go/releases/latest#hjson-cli_$VERSION_Windows.exe)

- [All Downloads](https://github.com/hjson/hjson-go/releases/latest)


<script type="text/javascript">
  $(document).ready(function () {

    $.getJSON("https://api.github.com/repos/hjson/hjson-go/releases/latest").done(function (release) {
      var base=release.assets[0].browser_download_url;
      var i=base.lastIndexOf('/');
      base=base.substr(0, i);
      i=base.lastIndexOf('/');
      var latestVersion=base.substr(i+1);

      // update links
      $("a").each(function() {
        var i=this.href.indexOf("/latest#");
        if (i>0) {
          this.href=base+"/"+this.href.substr(i+8);
        }
      });

      // update code
      $("code").each(function() {

        var i=this.innerText.indexOf("$URL");
        if (i>0) {
          this.innerText=this.innerText.substr(0, i)+base+this.innerText.substr(i+4);
        }
      });

      $("code").each(function() {
        this.innerText=this.innerText.replaceAll("$VERSION", latestVersion);
      });

      $("a").each(function() {
        this.href=this.href.replaceAll("$VERSION", latestVersion);
      });

    });
  });
</script>
