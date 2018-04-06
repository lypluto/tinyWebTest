

//==============================================================================
//  Basic Cards Buy button event
//==============================================================================
const supportedPaymentMethods = [  
  {  
    supportedMethods: ['basic-card'],
    data: {
        supportedNetworks: ['visa', 'mastercard', 'amex', 'discover'],
        supportedTypes: ['credit', 'debit'],
    },
  }  
];  

const paymentDetails = {  
  total: {
    label: 'Total',  
    amount:{  
      currency: 'USD',  
      value: 0.50  
    }  
  }
};

/**
 * Click event of Basic Cards Pay button
 */
function onBasicBuyBtnClicked() {
    console.log("onTestBtnClicked()...");

    if (!window.PaymentRequest) {
        console.log("buildSimplePaymentRequest: PaymentRequest API is not available!");
        alert('PaymentRequest API is not available!');
        return null;
    }
    
    const request = new PaymentRequest(  
      supportedPaymentMethods,  
      paymentDetails,  
      {}  
    );
    
    request.show()  
    .then(function(response) {
      // Process response
      response.complete("success");
      console.log("Payment success!");
      alert('Payment is successful!');
    }).catch(function(err) {
      console.error("Uh oh, something bad happened", err.message);
      alert('Payment is cancelled!');
    });
}

//==============================================================================
//  Spay Buy button event
//==============================================================================

// meta data for spay payment test
const supportedPayMethods = ['https://ecomm.stg.mpay.samsung.com/ew/v1/vco/w3c'];

const dummyDetails = {
    total: {
        label: "Total due",
        amount: { currency: "USD", value: "00.00" }
    }
};
const dummyOptions = {};

/**
 * This method is used to generate a W3C PaymentRequest object
 * based on given info.
 * 
 */
function buildPaymentRequest(checkoutPaymentInfo, visaData, payInitParams) {

    if (!window.PaymentRequest) {
        console.log("buildSimplePaymentRequest: PaymentRequest API is not available!");
        alert('PaymentRequest API is not available!');
        return null;
    }
    
    // generate payment request data:
    var payRequestData = {
        checkoutPartner: "VisaCheckout",
        requestPayload: {
            data: {
                checkoutPaymentInfo: checkoutPaymentInfo,
                visaIntentData: visaData,
                paymentInitParams: payInitParams
            }
        }
    };
    
    // generate payment method data:
    var methodData = [{
        supportedMethods: supportedPayMethods,
        data: payRequestData
    }];
    
    
    // generate W3C PaymentRequest object:
    var dummyRequest = new PaymentRequest(  
        methodData,  
        dummyDetails,  // not being used since spay has its own payment sheet.
        dummyOptions  
    );
    
    return dummyRequest;
}

//------------------------------------------------------------------------------

const btnAction = "Pay";        // need to show amount on payment sheet
const shippingNeeded = true;    // need to show shipping addr on payment sheet
const checkoutPaymentInfo = {
    currencyCode: "USD",
    total: "20.00",
    buttonAction: btnAction,
    reviewMessage: "Review message"
};

// create a variable holding dummy payment parameters:
const paymentInitParams = {
	correlationId: "correlation_id_1234",
	visitId: "visit_id_1234",
	locale: "en_US",
	collectShippingAddress: shippingNeeded,
	CheckoutPaymentInfo: {
		currencyCode: "USD",
		total: "44.47",
		buttonAction: btnAction
	},
	PaymentConstraints: {
		acceptedBillingCountries: ["US", "CA", "AU"],
		acceptedShippingCountries: [],
		acceptedCardBrands: ["VISA"],
		acceptCanadianVisaDebit: false
	},
	MerchantInfo: {
		displayName: "Test Merchant Name",
		logoUrl: "http://merchant.com/logo",
		websiteUrl: "http://merchant.com",
		customerSupportUrl: "http://merchant.com/customerservice",
		bannerDisplayName: "Banner",
		bannerURL: "http://merchant.com/banner",
		currencyFormat: "USD",
		countryCode: "US"
	}
};

const visaIntentData =          "ew0KCSJyZWZlcmVuY2VVUkwiOiAiaHR0cDovL3d3dy5nb29nbGUuY29tIiwNCgkibWVyY2hhbnRBcGlLZXkiOiAiMEdLU1dLQTBaOEJLTEc0UlVBSjUxM0NHeG15RVRNWTBhUU41ZE5Yc3dlWlJQOXFTQSIsDQoJIm9yZGVySWQiOiAiTWFub2oxMjM0NSIsDQoJImV2ZW50U291cmNlIjogIkxpZ2h0Ym94VFciLA0KCSJjaGFubmVsIjogIldlYiIsDQoJImN1cnJlbmN5Q29kZSI6ICJVU0QiLA0KCSJzdWJ0b3RhbCI6ICI4MCIsDQoJInNoaXBwaW5nSGFuZGxpbmciOiAiNSIsDQoJInRheCI6ICI1IiwNCgkiZGlzY291bnQiOiAiNSIsDQoJImdpZnRXcmFwIjogIjEwIiwNCgkibWlzYyI6ICI1IiwNCgkidG90YWwiOiAiMTAwIiwNCgkicmV2aWV3TWVzc2FnZSI6ICJJbiBjb21wdXRpbmcsIHBsYWluIHRleHQgaXMgdGhlIGRhdGEgKCkiLA0KCSJtZXJjaGFudENvbmZpZyI6IHsNCgkJImV4dGVybmFsUHJvZmlsZUlkIjogIlRlc3QxIg0KCX0NCn0=";

/**
 * Click event for Spay Buy button
 */
function onSpayBuyBtnClicked() {
    console.log("onBuyBtnClicked()...");
    var request = buildPaymentRequest(checkoutPaymentInfo, visaIntentData, paymentInitParams);
    if (request == null) {
        console.error("Null PaymentRequest!");
        return;
    }
    
    console.log("request.show()...");
    request.show()  
    .then(function(response) {
        // Process response
        response.complete("success");
        console.log("Payment success!");
        alert('Payment is successful!');
    }).catch(function(err) {
        console.error("Something bad happened", err.message);
        alert('Payment is cancelled!');
    });
}

function onCanMakePayClicked() {
    console.log("onCanMakePayClicked()...");
    var request = buildPaymentRequest(checkoutPaymentInfo, visaIntentData, paymentInitParams);
    if (request == null) {
        console.error("onCanMakePayClicked: Null PaymentRequest!");
        return;
    }
    
    console.log("request.canMakePayment()...");
    
    if (request.canMakePayment) {
        request.canMakePayment().then(function(result) {
            if (result) {
                console.log("Can make active payment!");
            } else {
                console.log("Cannot make active payment!");
            }
        }).catch(function(err) {
            console.error("Something bad happened", err.message);
            //alert('Payment is cancelled!');
        });
    } else {
        console.error("cannot make payment");
    }
    
    setTimeout(function() {
        console.log("do it again! request.canMakePayment()...");
        if (request.canMakePayment) {
            request.canMakePayment().then(function(result) {
                if (result) {
                    console.log("Can make active payment!");
                } else {
                    console.log("Cannot make active payment!");
                }
            }).catch(function(err) {
                console.error("Something bad happened", err.message);
                //alert('Payment is cancelled!');
            });
        } else {
            console.error("cannot make payment");
        }
    }, 5000);
    
    
}


