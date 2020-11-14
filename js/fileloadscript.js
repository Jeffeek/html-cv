function dropHandler(evt) 
{
    evt.stopPropagation();
    evt.preventDefault();
 
    var files = evt.dataTransfer.files;
 
    if (files.length != 1) 
    {
        console.log("Please drag and drop 1 file!");
        return;
    }

    var file = files[0];
 
    var fileReader = new FileReader();
 
    fileReader.onloadstart = (progressEvent) =>
    {
        console.log('onload');
    }
 
    fileReader.onload = (progressEvent) =>
    {
        console.log("onload!");
        var stringData = fileReader.result;
        let object = JSON.parse(stringData);
        console.log(object);
    }
 
    fileReader.onloadend = (progressEvent) =>
    {
        console.log("onloadend!");
    }
 
    fileReader.onerror = (progressEvent) =>
    {
        console.log("onerror!");
    }

    fileReader.readAsText(file, "UTF-8"); // fileReader.result -> String.
}
 
function dragoverHandler(evt) 
{
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}