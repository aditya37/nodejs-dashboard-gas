$(document).ready(function () {
  // var firebaseConfig = {
  //   apiKey: "AIzaSyCWXReWxcAZ-HbxCFLAhZTXv1ew2bZqebQ",
  //   authDomain: "db-iot-e8e04.firebaseapp.com",
  //   databaseURL: "https://db-iot-e8e04-default-rtdb.firebaseio.com",
  //   projectId: "db-iot-e8e04",
  //   storageBucket: "db-iot-e8e04.appspot.com",
  //   messagingSenderId: "128843050363",
  //   appId: "1:128843050363:web:7b98c02fbfeff29da7a1de",
  // };

  var firebaseConfig = {
    apiKey: "AIzaSyCSbOpD9oda_9ePh1kTzbmWcH6erbizmK0",
    authDomain: "db-sensor.firebaseapp.com",
    databaseURL: "https://db-sensor-default-rtdb.firebaseio.com",
    projectId: "db-sensor",
    storageBucket: "db-sensor.appspot.com",
    messagingSenderId: "53969108786",
    appId: "1:53969108786:web:5e902f0cdfc8b33030a12b",
  };

  // Validate Firebase connection
  if (!firebase.apps.length) {
    try {
      firebase.initializeApp(firebaseConfig);
    } catch (error) {
      console.log(error);
    }
  }

  var db = firebase.database().ref("/sensors/");
  var labels = [];
  var sulfur_dioxide_array = [];
  var carbon_dioxide_array = [];
  var carbon_monoxide_array = [];

  var chartContext = document.getElementById("sensor-chart").getContext("2d");
  function getdata() {
    var getSensorDatas = db.on("value", function (snapshot) {
      snapshot.forEach((element) => {
        let elmVal = element.val();
        labels.push(elmVal.tanggal);
        sulfur_dioxide_array.push(elmVal.ppm_so2);
        carbon_dioxide_array.push(elmVal.ppm_co2);
        carbon_monoxide_array.push(elmVal.ppm_co);
      });

      // for (var i in datas) {
      //     console.log(datas.result)
      //     // labels.push(datas[i].date_record)
      //     // sulfur_dioxide_array.push(datas[i].sensor_record.sulfur_dioxide)
      //     // carbon_dioxide_array.push(datas[i].sensor_record.carbon_dioxide)
      //     // carbon_monoxide_array.push(datas[i].sensor_record.carbon_monoxide)
      // }

      var chart = new Chart(chartContext, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              // backgroundColor: "rgb(255, 159, 64)",
              label: "Sensor SO2 (ppm)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              data: sulfur_dioxide_array,
            },
            {
              label: "Sensor CO2 (ppm)",
              borderColor: "rgba(255, 159, 64)",
              borderWidth: 2,
              data: carbon_dioxide_array,
            },
            {
              label: "Sensor CO (ppm)",
              borderColor: "rgba(255, 159, 64)",
              borderWidth: 2,
              data: carbon_monoxide_array,
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
      console.log(labels);
    });
  }

  // function addData(chart,data) {
  //     chart.data.datasets.forEach(dataset => {
  //         dataset.data.push(data)
  //     });
  //     chart.update()
  // }
  getdata();
});
