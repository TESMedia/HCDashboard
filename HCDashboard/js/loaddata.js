//var BaseUrl = "http://localhost:911/HealthCheck";//localStorage.getItem("rtlsUrl");
//var BaseUrl = "http://35.176.38.216/HealthCheck";
var BaseUrl = "";;
var Service = BaseUrl + "/service/all";
var IIS = BaseUrl + "/iis/status";
var Performance = BaseUrl + "/Performance/status";

var Device = BaseUrl + "/Device/status";
var Radius = BaseUrl + "/Radius/status";
var Port = BaseUrl + "/port/all";
var DB = BaseUrl + "/db/status";
var MySQl = BaseUrl + "/mysql/status";
//On Page Load we need to call
function getDashBordInfo() {

GetServiceInfo(Service);
GetDeviceInfo(Device);
GetIISInfo(IIS);
GetPerformanceInfo(Performance);
GetRadiusInfo(Radius);
GetPortInfo(Port);
GetDBInfo(DB);
GetMySQLnfo(MySQl);
}
//updateDashbord();
function updateDashbord(BaseUrl) {

    //5 min -300000
    //10 min -600000
    BaseUrl = BaseUrl;

     Service = BaseUrl + "/service/all";
     IIS = BaseUrl + "/iis/status";
     Performance = BaseUrl + "/Performance/status";

     Device = BaseUrl + "/Device/status";
     Radius = BaseUrl + "/Radius/status";
     Port = BaseUrl + "/port/all";
     DB = BaseUrl + "/db/status";
     MySQl = BaseUrl + "/mysql/status";
     $('#LogMessage').empty();
    getDashBordInfo();
    setInterval(getDashBordInfo, 60000);
   }

$('#LogMessage').empty();
function gettime() {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    var today = d + '-' + m + '-' + y;
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = today +'  '+ hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
function formatDisplay(val) {
    var errorText = ["failed", "Stopped", "not", "Can't", "Denger", "Warning", "Exception"];
    var message = "";
    if(val!=null && val!=''){
    $.each(errorText, function (key, item) {
        if (val.indexOf(item) != -1) {
            message = "<p class='text-danger' >" + gettime() +' : ' +val + "<p>";
        } 
    });
    }
    if (message == "") { message = "<p class='text-info' >" + gettime() + ' : ' + val + "<p>"; }
    return message;
}


function GetServiceInfo (url) {
    $('#serviceStatusClass').removeClass('bg-warning').removeClass('bg-danger').addClass('bg-success');
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        beforeSend: function () {
            // Show image container
            $("#ServiceLoading").show();
        },
       success: function (data) {
          
           $('#serviceStatus').empty();
           $('#Servicelog').empty();
            $.each(data.ServiceStatusResult.Message, function (key, item) {
                $('#LogMessage').prepend(formatDisplay(item));
                $('#Servicelog').append(formatDisplay(item));
            });
            if (data.ServiceStatusResult.Status) {
                $("#serviceStatus").append('Status ok.');

            } else {
                $("#serviceStatus").append('Something went wrong!');
            }
           
            if (data.ServiceStatusResult.Status != true) {
                $('#serviceStatusClass').removeClass('bg-success').removeClass('bg-warning').addClass('bg-danger');
            } else {
                $('#serviceStatusClass').removeClass('bg-warning').removeClass('bg-danger').addClass('bg-success');
            }
            $("#CallTime").text(gettime());
       }, complete: function (data) {
           // Hide image container
           $("#ServiceLoading").hide();
       },
       error: function (data, errorThrown) {
           $("#ServiceLoading").hide();
           $('#serviceStatusClass').removeClass('bg-success').removeClass('bg-warning').addClass('bg-danger');
               $("#serviceStatus").text('Service not avilable!');
               $('#LogMessage').prepend("<p class='text-danger'>" + 'ServiceInfo Health Check service not avilable!' + '</p>');
               $('#Servicelog').empty(); $('#Servicelog').append("<p class='text-danger'>" + 'ServiceInfo Health Check service not avilable!' + '</p>');
               $("#CallTime").text(gettime());
           }
    });
    ScrollDown();
}
function GetDeviceInfo(url) {
    var status = 0;
    $('#DeviceStatusClass').removeClass('bg-warning').removeClass('bg-danger').addClass('bg-success');
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        beforeSend: function () {
            // Show image container
            $("#DeviceLoading").show();
        },
        success: function (data) {
            
            $('#DeviceStatus').empty();
            $('#HDlog').empty();
            $.each(data.GetDeviceInfoResult, function (key, item) {
                $.each(item, function (key, item) {
                    $('#LogMessage').prepend(formatDisplay(key + " : " + item));
                    $('#HDlog').append(formatDisplay(key + " : " + item));
                });
            });
            $.each(data.GetDeviceInfoResult, function (key, item) {
                  if (item.Status > 0) {
                      status = 1;
                      if (item.Status > 1) {
                          status = 2;
                      }
                    }
                });
            //alert(status);
            if (status==0) {
                $("#DeviceStatus").append('Status ok.');

            } else {
                $("#DeviceStatus").append('Something went wrong!');
            }
            if (status == 0) {
                $('#DeviceStatusClass').removeClass('bg-warning').removeClass('bg-danger').addClass('bg-success');
                
            } else if (status == 1) {
                $('#DeviceStatusClass').removeClass('bg-success').removeClass('bg-danger').addClass('bg-warning');
            } else if (status == 2) {
                $('#DeviceStatusClass').removeClass('bg-success').removeClass('bg-warning').addClass('bg-danger');
            }
            $("#CallTime").text(gettime());
            }, complete: function (data) {
            $("#DeviceLoading").hide();
        },
        error: function (data, errorThrown) {
            $("#DeviceLoading").hide();
            $('#DeviceStatusClass').removeClass('bg-success').removeClass('bg-warning').addClass('bg-danger');
            $("#DeviceStatus").text('Service not avilable!');
            $('#LogMessage').prepend("<p class='text-danger'>" + 'DeviceInfo Health Check service not avilable!' + '</p>');
            $('#HDlog').empty(); $('#HDlog').append("<p class='text-danger'>" + 'DeviceInfo Health Check service not avilable!' + '</p>');
            $("#CallTime").text(gettime());
        }
    });
    ScrollDown();
}
function GetIISInfo(url) {

    $('#IISStatusClass').removeClass('bg-danger').removeClass('bg-warning').addClass('bg-success');

    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        beforeSend: function () {
            // Show image container
            $("#IISLoading").show();
        },
        success: function (data) {

            $('#IISStatus').empty();
            $('#IISLog').empty();
            $.each(data.IISStatusResult.Message, function (key, item) {
                $('#LogMessage').prepend(formatDisplay(item));
                $('#IISLog').append(formatDisplay(item));
    
            });
            if (data.IISStatusResult.ErrorInfo != 'null') $('#LogMessage').prepend('<p>' + data.IISStatusResult.ErrorInfo + '</p>');
           if (data.IISStatusResult.Status) {
                $("#IISStatus").append('Status ok.');

            } else {
                $("#IISStatus").append('Something went wrong!');
            }
            if ((data.IISStatusResult.Status) && (data.IISStatusResult.Status != true)) {
                $('#IISStatusClass').removeClass('bg-success').addClass('bg-warning');
            } else {
                $('#IISStatusClass').removeClass('bg-warning').addClass('bg-success');
            }
            if ((!data.IISStatusResult.Status)) { $('#IISStatusClass').removeClass('bg-success').addClass('bg-danger'); }
            $("#CallTime").text(gettime());
        }, complete: function (data) {
            // Hide image container
            $("#IISLoading").hide();
        },
        error: function (data, errorThrown) {
            $("#IISLoading").hide();
            $('#IISStatusClass').removeClass('bg-success').removeClass('bg-warning').addClass('bg-danger');
            $("#IISStatus").text('Service not avilable!');
            $('#LogMessage').prepend("<p class='text-danger'>" + 'IIS Health Check service not avilable!' + '</p>');
            $('#IISLog').empty(); $('#IISLog').append("<p class='text-danger'>" + 'IIS Health Check service not avilable!' + '</p>');
            $("#CallTime").text(gettime());
        }
    });
    ScrollDown();
}
function GetPerformanceInfo(url) {
    var status = 0;
    $('#PerformanceStatusClass').removeClass('bg-warning').removeClass('bg-danger').addClass('bg-success');
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        beforeSend: function () {
            // Show image container
            $("#PerformanceLoading").show();
        },
        success: function (data) {

            $('#PerformanceStatus').empty();
            $('#CPUlog').empty();
            $.each(data.PerformanceInfoResult, function (key, item) {

                $('#LogMessage').prepend(formatDisplay(key + " : " + item));
                $('#CPUlog').append(formatDisplay(key + " : " + item));
            });
            status = data.PerformanceInfoResult.Status;
            if (status==0) {
                $("#PerformanceStatus").append('Status ok.');

            } else {
                $("#PerformanceStatus").append('Something went wrong!');
            }

            if (status == 0) {
                $('#PerformanceStatusClass').removeClass('bg-warning').removeClass('bg-danger').addClass('bg-success');

            } else if (status == 1) {
                $('#PerformanceStatusClass').removeClass('bg-success').removeClass('bg-danger').addClass('bg-warning');
            } else if (status == 2) {
                $('#PerformanceStatusClass').removeClass('bg-success').removeClass('bg-warning').addClass('bg-danger');
            }
            $("#CallTime").text(gettime());
        },
        complete: function (data) {
            // Hide image container
            $("#PerformanceLoading").hide();
        },
        error: function (data, errorThrown) {
            $("#PerformanceLoading").hide();
            $('#PerformanceStatusClass').removeClass('bg-success').removeClass('bg-warning').addClass('bg-danger');
            $("#PerformanceStatus").text('Service not avilable!');
            $('#LogMessage').prepend("<p class='text-danger'>" + 'PerformanceInfo Health Check service not avilable!' + '</p>');
            $('#CPUlog').empty(); $('#CPUlog').append("<p class='text-danger'>" + 'PerformanceInfo Health Check service not avilable!' + '</p>');
            $("#CallTime").text(gettime());
        }
    });
    ScrollDown();
   
}
function GetRadiusInfo(url) {
    $('#RadiusStatusClass').removeClass('bg-warning').removeClass('bg-danger').addClass('bg-success');
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        beforeSend: function () {
            // Show image container
            $("#RadiusLoading").show();
        },
        success: function (data) {

            $('#RadiusStatus').empty();
            $('#Radiuslog').empty();
            $.each(data.RadiusStatusResult.Message, function (key, item) {

                $('#LogMessage').prepend(formatDisplay(item));
                $('#Radiuslog').append(formatDisplay(item));
            });
            //$("#RadiusStatus").text(data.RadiusStatusResult.Status);
            if (data.RadiusStatusResult.Status) {
                $("#RadiusStatus").append('Status ok.');

            } else {
                $("#RadiusStatus").append('Something went wrong!');
            }
            if ((data.RadiusStatusResult.Status) && (data.RadiusStatusResult.Status != true)) {
                $('#RadiusStatusClass').removeClass('bg-success').removeClass('bg-warning').addClass('bg-danger');
            } else {
                $('#RadiusStatusClass').removeClass('bg-warning').removeClass('bg-danger').addClass('bg-success');
            }
            if ((!data.RadiusStatusResult.Status)) { $('#RadiusStatusClass').removeClass('bg-success').removeClass('bg-warning').addClass('bg-danger'); }
            $("#CallTime").text(gettime());
        },
        complete:function(data){
            // Hide image container
            $("#RadiusLoading").hide();
        },
        error: function (data, errorThrown) {
            $("#RadiusLoading").hide();
            $('#RadiusStatusClass').removeClass('bg-success').removeClass('bg-warning').addClass('bg-danger');
            $("#RadiusStatus").text('Service not avilable!');
            $('#LogMessage').prepend("<p class='text-danger'>" + 'RadiusInfo Health Check service not avilable!' + '</p>');
            $('#Radiuslog').empty(); $('#Radiuslog').append("<p class='text-danger'>" + 'RadiusInfo Health Check service not avilable!' + '</p>');
            $("#CallTime").text(gettime());
        }
    });
    ScrollDown();
}

function GetPortInfo(url) {
    $('#PortStatusClass').removeClass('bg-warning').removeClass('bg-danger').addClass('bg-success');
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        beforeSend: function () {
            // Show image container
            $("#PortLoading").show();
        },
        success: function (data) {

            $('#PortStatus').empty();
            $('#Portlog').empty();
            $.each(data.PortStatusResult.Message, function (key, item) {

                $('#LogMessage').prepend(formatDisplay(item));
                $('#Portlog').append(formatDisplay(item));
            });
            if (data.PortStatusResult.Status) {
                $("#PortStatus").append('Status ok.');

            } else {
                $("#PortStatus").append('Something went wrong!');
            }
            if ((data.PortStatusResult.Status) && (data.PortStatusResult.Status != true)) {
                $('#PortStatusClass').removeClass('bg-warning').removeClass('bg-success').addClass('bg-danger');
            } else {
                $('#PortStatusClass').removeClass('bg-warning').removeClass('bg-danger').addClass('bg-success');
            }
            if ((!data.PortStatusResult.Status)) { $('#PortStatusClass').removeClass('bg-warning').removeClass('bg-success').addClass('bg-danger'); }
            $("#CallTime").text(gettime());
        },
        complete: function (data) {
            // Hide image container
            $("#PortLoading").hide();
        },
        error: function (data, errorThrown) {
            $("#PortLoading").hide();
            $('#PortStatusClass').removeClass('bg-success').removeClass('bg-warning').addClass('bg-danger');
            $("#PortStatus").text('Service not avilable!');
            $('#LogMessage').prepend("<p class='text-danger'>" + 'Port Health Check service not avilable!' + '</p>');
            $('#Portlog').empty(); $('#Portlog').append("<p class='text-danger'>" + 'Port Health Check service not avilable!' + '</p>');
            $("#CallTime").text(gettime());
        }
    });
   
    ScrollDown();
}
function GetDBInfo(url) {
    $('#DBStatusClass').removeClass('bg-warning').removeClass('bg-danger').addClass('bg-success');
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        beforeSend: function () {
            // Show image container
            $("#DBLoading").show();
        },
        success: function (data) {

            $('#DBStatus').empty();
            $('#DBlog').empty();
            $.each(data.DBStatusResult.Message, function (key, item) {

                $('#LogMessage').prepend(formatDisplay(item));
                $('#DBlog').append(formatDisplay(item));
            });
            if (data.DBStatusResult.Status) {
                $("#DBStatus").append('Status ok.');

            } else {
                $("#DBStatus").append('Something went wrong!');
            }
            if ((data.DBStatusResult.Status) && (data.DBStatusResult.Status != true)) {
                $('#DBStatusClass').removeClass('bg-success').removeClass('bg-warning').addClass('bg-danger');
            } else {
                $('#DBStatusClass').removeClass('bg-danger').removeClass('bg-warning').addClass('bg-success');
            }
            
            $("#CallTime").text(gettime());
        },
        complete: function (data) {
            // Hide image container
            $("#DBLoading").hide();
        },
        error: function (data, errorThrown) {
            $("#DBLoading").hide();
            $('#DBStatusClass').removeClass('bg-success').removeClass('bg-warning').addClass('bg-danger');
            $("#DBStatus").text('Service not avilable!');
            $('#LogMessage').prepend("<p class='text-danger'>" + 'Database Health Check service not avilable!' + '</p>');
            $('#DBlog').empty(); $('#DBlog').append("<p class='text-danger'>" + 'Database Health Check service not avilable!' + '</p>');
            $("#CallTime").text(gettime());
        }
    });
    ScrollDown();
}

function GetMySQLnfo(url) {
    $('#MySQLStatusClass').removeClass('bg-warning').removeClass('bg-danger').addClass('bg-success');
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        beforeSend: function () {
            // Show image container
            $("#MySQLLoading").show();
        },
        success: function (data) {

            $('#MySQLStatus').empty();
            $('#MySQLlog').empty();
            $.each(data.MySQLServiceStatusResult.Message, function (key, item) {
                if (data.MySQLServiceStatusResult.Status) {
                    item = item.replace('Warning', '>>');
                    item = item.replace(/\n/g, "<br/>");

                }
                $('#LogMessage').prepend(formatDisplay(item));
                $('#MySQLlog').append(formatDisplay(item));
            });
            if (data.MySQLServiceStatusResult.Status) {
                $("#MySQLStatus").append('Status ok.');

            } else {
                $("#MySQLStatus").append('Something went wrong!');
                $('#MySQLStatusClass').removeClass('bg-success').removeClass('bg-warning').addClass('bg-danger');
            }
            if ((data.MySQLServiceStatusResult.Status != true)) {
                $('#MySQLStatusClass').removeClass('bg-success').removeClass('bg-warning').addClass('bg-danger');
            } else {
                $('#MySQLStatusClass').removeClass('bg-danger').removeClass('bg-warning').addClass('bg-success');
            }

            $("#CallTime").text(gettime());
        },
        complete: function (data) {
            // Hide image container
            $("#MySQLLoading").hide();
        },
        error: function (data, errorThrown) {
            $("#MySQLLoading").hide();
            $('#MySQLStatusClass').removeClass('bg-success').removeClass('bg-warning').addClass('bg-danger');
            $("#MySQLStatus").text('Service not avilable!');
            $('#LogMessage').prepend("<p class='text-danger'>" + 'MySQL Health Check service not avilable!' + '</p>');
            $('#MySQLlog').empty(); $('#DBlog').append("<p class='text-danger'>" + 'My SQL Health Check service not avilable!' + '</p>');
            $("#CallTime").text(gettime());
        }
    });
    ScrollDown();
}

function ScrollDown() {
    //$("#LogMessage").stop().animate({ scrollTop: $("#LogMessage")[0].scrollHeight + 50000 }, 5000);//ScrollDown
    $("#LogMessage").stop().animate({ scrollTop: 0  }, 5000); //Scroll Up
  }


//$("#local").click(function () {
//    BaseUrl = "http://localhost:911/HealthCheck";
//    updateDashbord(BaseUrl);
//    $("#CurrentDashbord").text("Local Dashboard");
   
//})
//$("#Test").click(function () {
//    BaseUrl = "http://35.176.38.216/HealthCheck";
//    updateDashbord(BaseUrl);
//    $("#CurrentDashbord").text("Test Dashboard");
   
//})

function LoadConfiguration() {
    var file = "./Dashboard.json";
     $.getJSON(file, function(json) {
        // console.log(json);
        $("#exampleAccordion").html('');
        $("#exampleAccordion").append(" <li class='nav-item' data-toggle='tooltip' data-placement='right' title='Dashboard'> <a class='nav-link'><i class='fa fa-fw '></i><span class='nav-link-text'></span></a></li>")
        $("#exampleAccordion").append(" <li class='nav-item' data-toggle='tooltip' data-placement='right' title='Dashboard'> <a class='nav-link'><i class='fa fa-fw '></i><span class='nav-link-text'></span></a></li>")

        for (var i = 0; i < json.length; i++) {
           
            $("#exampleAccordion").append(" <li class='nav-item' data-toggle='tooltip' data-placement='right' title='Dashboard'> <a class='nav-link' href='#' id='" + json[i].ID + "' onclick=\"loadDashB('" + json[i].Server + "','" + json[i].DisplayName + "');\"><i class='fa fa-fw '></i><span class='nav-link-text'>" + json[i].DisplayName + "</span></a></li>");
         }
    });
}
function loadDashB(server, displayName) {
    BaseUrl = server;
    updateDashbord(BaseUrl);
    $("#CurrentDashbord").text(displayName);

}
$(document).ready(function () {
    LoadConfiguration();
});




