
# Download Hjson

To install the Hjson CLI tool

- Linux

  ```
  # in bash
  GET=$URL/linux_amd64.tar.gz
  curl -sSL $GET | sudo tar -xz -C /usr/local/bin
  ```

- macOS & OS X

  ```
  # run in Terminal
  GET=$URL/darwin_amd64.tar.gz
  curl -sSL $GET | sudo tar -xz -C /usr/local/bin
  ```

- Windows

  [Download](https://github.com/hjson/hjson-go/releases/latest#windows_amd64.zip) and unzip

- [All Downloads](https://github.com/hjson/hjson-go/releases/latest)


<script type="text/javascript">
  $(document).ready(function () {

    $.getJSON("https://api.github.com/repos/hjson/hjson-go/releases/latest").done(function (release) {
      var base=release.assets[0].browser_download_url;
      var i=base.lastIndexOf('/');
      base=base.substr(0, i);

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

    });
  });
</script>