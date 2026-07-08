// ===== CONFIG - your details =====
var TOKEN = "90935087|-31949247952377819|90904052";
var BASE_URL = "http://api.login2explore.com:5577";
var DB_NAME = "EMP-DB";
var REL_NAME = "EmpData";

var currentRecNo = null; // stores rec_no of the loaded employee (for UPDATE)

// ===== Generic helper to build request string =====
function createRequest(cmd, jsonObj, extra) {
    var req = {
        "token": TOKEN,
        "cmd": cmd,
        "dbName": DB_NAME,
        "rel": REL_NAME
    };
    if (extra) {
        for (var key in extra) {
            req[key] = extra[key];
        }
    }
    if (jsonObj !== undefined) {
        req["jsonStr"] = jsonObj;
    }
    return JSON.stringify(req);
}

// ===== Generic helper to execute a command (sync call) =====
function executeCommand(reqString, apiEndPointUrl) {
    var url = BASE_URL + apiEndPointUrl;
    var jsonObj;
    jQuery.ajaxSetup({async: false});
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        jsonObj = JSON.parse(result.responseText);
    });
    jQuery.ajaxSetup({async: true});
    return jsonObj;
}

// ===== Runs on page load =====
$(document).ready(function () {
    resetForm();

    // When user leaves the Employee ID field
    $("#empid").on("blur", function () {
        checkEmployee();
    });
});

// ===== Reset the form to initial (empty) state =====
function resetForm() {
    $("#empid").val("").prop("disabled", false);
    $("#empname").val("").prop("disabled", true);
    $("#empsal").val("").prop("disabled", true);
    $("#hra").val("").prop("disabled", true);
    $("#da").val("").prop("disabled", true);
    $("#deduct").val("").prop("disabled", true);

    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);

    currentRecNo = null;
    $("#empid").focus();
}

// ===== Check if Employee ID exists in DB =====
function checkEmployee() {
    var empId = $("#empid").val();
    if (empId === "") {
        return;
    }

    var reqStr = createRequest("GET_BY_KEY", {"id": empId});
    var result = executeCommand(reqStr, "/api/irl");

    if (result.status === 200 && result.data) {
        // Record exists - populate form
        var dataObj = JSON.parse(result.data);
        var record = dataObj.record;
        currentRecNo = dataObj.rec_no;

        $("#empname").val(record.name).prop("disabled", false);
        $("#empsal").val(record.salary).prop("disabled", false);
        $("#hra").val(record.hra).prop("disabled", false);
        $("#da").val(record.da).prop("disabled", false);
        $("#deduct").val(record.deduction).prop("disabled", false);

        $("#empid").prop("disabled", true); // lock ID field
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#save").prop("disabled", true);

        $("#empname").focus();
    } else {
        // Record does not exist - allow fresh entry
        currentRecNo = null;
        $("#empname").val("").prop("disabled", false);
        $("#empsal").val("").prop("disabled", false);
        $("#hra").val("").prop("disabled", false);
        $("#da").val("").prop("disabled", false);
        $("#deduct").val("").prop("disabled", false);

        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#change").prop("disabled", true);

        $("#empname").focus();
    }
}

// ===== Validate that no field is empty =====
function validateData() {
    var empId = $("#empid").val();
    var empName = $("#empname").val();
    var empSal = $("#empsal").val();
    var hra = $("#hra").val();
    var da = $("#da").val();
    var deduct = $("#deduct").val();

    if (empId === "" || empName === "" || empSal === "" || hra === "" || da === "" || deduct === "") {
        alert("All fields are required!");
        return null;
    }

    return {
        id: empId,
        name: empName,
        salary: empSal,
        hra: hra,
        da: da,
        deduction: deduct
    };
}

// ===== Save (PUT) a brand new employee =====
function saveData() {
    var data = validateData();
    if (data === null) {
        return;
    }

    var reqStr = createRequest("PUT", data);
    var result = executeCommand(reqStr, "/api/iml");
    alert(JSON.stringify(result));
    resetForm();
}

// ===== Change (UPDATE) an existing employee =====
function changeData() {
    var data = validateData();
    if (data === null) {
        return;
    }
    if (currentRecNo === null) {
        alert("No record loaded to update!");
        return;
    }

    delete data.id; // don't update the primary key itself

    var updateObj = {};
    updateObj[currentRecNo] = data;

    var reqStr = createRequest("UPDATE", updateObj);
    var result = executeCommand(reqStr, "/api/iml");
    alert(JSON.stringify(result));
    resetForm();
}