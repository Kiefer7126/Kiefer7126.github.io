document.getElementById("fileUploadImage").addEventListener("change", function () {
    console.log("test")
    // フォームで選択された全ファイルを取得
    var fileList = this.files;

    // 個数分の画像を表示する
    for (var i = 0, l = fileList.length; l > i; i++) {
        // Blob URLの作成
        var blobUrl = window.URL.createObjectURL(fileList[i]);

        // HTMLに書き出し (src属性にblob URLを指定)
        document.body.innerHTML += '<a href="' + blobUrl + '" target="_blank"><img src="' + blobUrl + '"></a>';
    }
});