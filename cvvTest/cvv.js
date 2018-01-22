

//==============================================================================
//  CVV dummy test
//==============================================================================

function onAddCvvClicked() {
    console.log("onAddCvvClicked()...");
    console.log("CVV submitted");
    //alert('CVV submitted');
    //document.getElementById('answer1').value = "CVV submitted";
    document.writeln("CVV submitted");
}

function onClearCvvClicked() {
    console.log("onClearCvvClicked()...");
    document.getElementById('cvvEdit').value = "";
    console.log("CVV cleared");
    //alert('CVV cleared');
}

