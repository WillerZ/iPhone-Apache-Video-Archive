// Globals
var TopDirectory = window.location.pathname.replace(/iphone.html$/,'');
var TopURL = window.location.protocol + '//' + window.location.host + TopDirectory;
var jQT = $.jQTouch({
statusBar: 'black-translucent',
preloadImages: [
            'themes/jqt/img/chevron_white.png',
            'themes/jqt/img/bg_row_select.gif',
            'themes/jqt/img/back_button_clicked.png',
            'themes/jqt/img/button_clicked.png'
            ]
});

$(document).ready(function(){
    $('#home .edgetoedge').load(TopDirectory + ' a',function(){fixlist("home",TopDirectory);});
    $('#video video').each(function()
    {
      this.width = window.innerWidth;
      this.height = window.innerWidth * 3 / 4;
      this.addEventListener('loadedmetadata',function()
      {
        $('#video video').each(function()
        {
          this.width = (this.videoWidth > window.innerWidth)?window.innerWidth:this.videoWidth;
          this.height = (this.videoHeight > window.innerHeight)?window.innerHeight:this.videoHeight;
          this.play();
        });
      },false);
    });
});
function loadDirectory(url,section)
{
  $('#' + section + ' .edgetoedge').load(url + ' a',function(){fixlist(section,url);});
}
function fixlist(section,baseURL)
{
  $('#'+section + ' .edgetoedge a[href^="/"]').remove();
  $('#'+section + ' .edgetoedge a[href^="?"]').remove();
  $('#'+section + ' .edgetoedge a[href^="jqtouch"]').remove();
  $('#'+section + ' .edgetoedge a[href^="themes"]').remove();
  $('#'+section + ' .edgetoedge a[href$="html"]').remove();
  $('#'+section + ' .edgetoedge a[href$="js"]').remove();
  $('#'+section + ' .edgetoedge a[href$="/"]').wrap('<li class="arrow" />');
  $('#'+section + ' a[href$="/"]').each(function(idx,elem)
  {
    this.innerText = this.innerText.replace(/\/$/,'');
    var url = this.href;
    url = url.replace(TopURL,'');
    var newsection = unescape(url).replace(/ /g,'_');
    newsection = newsection.replace(/\/$/,'');
    newsection = newsection.replace(/\//g,'.');
    $('#placeholder').before('<div id="' + newsection + '"><div class="toolbar"><a class="button back" href="#">Back</a><h1>'+url.replace(/%20/g,' ').replace(/\/$/,'')+'</h1></div><ul class="edgetoedge"></ul></div>');
    this.href = '#' + newsection;
    loadDirectory(baseURL+url,newsection);
  });
  $('#'+section + ' .edgetoedge > a').each(function(idx,elem)
  {
    this.innerText = this.innerText.replace(/\.m4v$/,'');
    this.innerText = this.innerText.replace(/^\d{1,4} - /,'');
    var url = this.href;
    url = url.replace(TopURL,'');
    url = baseURL + url;
    this.href='#video';
    this.onclick=function(){$('#video video').each(function(){this.src=url;});};
  });
  $('#'+section + ' .edgetoedge > a').wrap('<li />');
}
