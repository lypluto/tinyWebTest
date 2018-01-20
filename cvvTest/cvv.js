

//==============================================================================
//  CVV dummy test
//==============================================================================

function onAddCvvClicked() {
    console.log("onAddCvvClicked()...");
    console.log("CVV submitted");
    alert('CVV submitted');
}

function onClearCvvClicked() {
    console.log("onClearCvvClicked()...");
    document.getElementById('cvvEdit').value = "";
    console.log("CVV cleared");
    //alert('CVV cleared');
}

