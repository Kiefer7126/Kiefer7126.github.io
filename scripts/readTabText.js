var startTime;
var beatStructure;

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
            startTime[startTime.length] = Number(wCount[0]);
        }
        segmentSet();
        drawChorus();
        //console.log(startTime);
    }
}

function parseBeatText(file)
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
        beatStructure = new Array();
        beatInterval = 0;
        
        for (var i=0; i<10; i++)
        {            
            wCount = lineData[i].split(TAB);
            beatStructure[beatStructure.length] = Number(wCount[0]);
        }
        
        for (var i = 1; i<10; i++)
            {
              beatInterval += (beatStructure[i] - beatStructure[i-1]);
            }
        
        beatInterval = beatInterval / 9;
        //console.log(beatStructure);
        //console.log(beatInterval);
    }
}

//改行区切りのテキストを読み込む
function parseLfText(file)
{
    var wCount;
    var reader = new FileReader();
    reader.readAsText(file[0])
    
    reader.onload = function(ev)
    {
        var lfText = reader.result;   
        var LF = String.fromCharCode(10); // 改行コード (LF)
        var lineData = lfText.split(LF);
        group = new Array();

        for (var i=0; i<lineData.length; i++)
        {
            group[group.length] = Number(lineData[i]);
        }
        //console.log(group);
        segmentSet();
    }
}

function segmentSet()
{
  for ( i=1; i<startTime.length; i++ )
  {
      $('#segment').append('<option value="' + startTime[i] + '">' + startTime[i] + '</option>');
      
    $(document).ready(function() {
    $('select').material_select();
});
//      document.selbox.segment.options[i] = new Option(startTime[i]);
  }
}

function segmentPlay()
{
    var val = $('#segment').val();
    //console.log("val");
    goSound(val);

//    var select = document.forms.selbox.segment; 
//    goSound(select.options[select.selectedIndex].value);
}