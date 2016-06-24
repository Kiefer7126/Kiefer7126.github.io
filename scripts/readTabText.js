var startTime;

function parseTabText(file)
{

    var wCount;
    var reader = new FileReader();
    reader.readAsText(file[0])
    
    reader.onload = function(ev)
    {
        var tabText = reader.result;   
        var LF = String.fromCharCode(10); // 改行コード (LF)
        var TAB = String.fromCharCode(9); // タブコード
        var lineData = tabText.split(LF);
        startTime = new Array();

        for (var i=0; i<lineData.length; i++)
        {            
            wCount = lineData[i].split(TAB);
            startTime[startTime.length] = wCount[0];
        }

        segmentSet();
    }
}

function segmentSet()
{
  for ( i=1; i<startTime.length; i++ )
  {
      document.selbox.segment.options[i] = new Option(startTime[i]);
  }
}

function segmentPlay()
{
    var select = document.forms.selbox.segment; 
    goSound(select.options[select.selectedIndex].value);
}