import React, { useEffect, useState } from "react";
const AWS = require("aws-sdk");

// Initialize the Amazon Cognito credentials provider

export default function home() {
    let temp;
    useEffect(() => {
        // Initialize the Amazon Cognito credentials provider
        AWS.config.region = "ap-south-1"; // Region

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: "ap-south-1:997bf395-fd83-487d-a96c-2b6eb6695747",
        });

        AWS.config.credentials.get(function (err) {
            // attach event listener
            if (err) {
                alert("Error retrieving credentials.");
                console.error(err);
                return;
            }

            // create Amazon Kinesis service object
            var kinesis = new AWS.Kinesis({
                apiVersion: "2013-12-02",
            });

            // var params = {
            //   ExclusiveStartStreamName: 'Kinesis-demo',
            //   Limit: '2'
            // };
            // kinesis.listStreams(params, function(err, data) {
            //   if (err) console.log(err, err.stack); // an error occurred
            //   else     console.log(data);           // successful response
            // });

            

            for (let index = 0; index < 100; index++) {

                var params = {
                    Data:
                        `The data has been send successfully no : ${index} ${Date.now()}` /* required */ /* Strings will be Base-64 encoded on your behalf */,
                    PartitionKey: "qwerty" /* required */,
                    StreamName: "kinesis-demo" /* required */,
                    // ExplicitHashKey: 'STRING_VALUE',
                    // SequenceNumberForOrdering: 'STRING_VALUE'
                };

                kinesis.putRecord(params, function (err, data) {
                    if (err) console.log(err, err.stack);
                    // an error occurred
                    else console.log(data, "senddddddd"); // successful response
                });

            }

            var params1 = {
                ShardId: "shardId-000000000003" /* required */,
                ShardIteratorType: "AT_TIMESTAMP" /* required */,
                StreamName: "kinesis-demo" /* required */,
                Timestamp: new Date(),
            };

            kinesis.getShardIterator(params1, function (err, data) {
                if (err) console.log(err, err.stack);
                // an error occurred

                else {
                    temp = data.ShardIterator;
                    // console.log(data);
                    var params2 = {
                        ShardIterator: temp /* required */,
                    };

                    kinesis.getRecords(params2, function (err, data) {
                        if (err) console.log(err, err.stack);
                        // an error occurred
                        else {
                            
                            let tempData = data.Records[0].Data;

                            var uint8array = Uint8Array.from(tempData);
                            var string = new TextDecoder().decode(uint8array);
                            console.log(string, "recieved")

                            data.Records.map(item => {
                                tempData = item.Data;

                                var uint8array = Uint8Array.from(tempData);
                                var string = new TextDecoder().decode(uint8array);
                                console.log(string)
                            });


                        }
                    });
                }
            });

            // var params2 = {
            //   ShardIterator: "AAAAAAAAAAGnO6Eh3UzYsf+tXqm147jnXYmMt5Xp3nik97eEXW…OFY922UZ68JhiFAneQxFKxUtSvGrvVf9nunfiSgSXkF3GLw==", /* required */

            // };
            // kinesis.getRecords(params2, function(err, data) {
            //   if (err) console.log(err, err.stack); // an error occurred
            //   else     console.log(data);           // successful response
            // });

            //   var params1 = {
            //     ShardIterator: 'dasasdas', /* required */
            //     Limit: '2'
            //   };
            //   kinesis.getRecords(params1, function(err, data) {
            //     if (err) console.log(err, err.stack); // an error occurred
            //     else     console.log(data);           // successful response
            //   });
        });
        var uint8array = Uint8Array.from([]);
        var string = new TextDecoder().decode(uint8array);
        // console.log(string)
    });

    return (
        <>
            <h2>Hello from kinesis</h2>
        </>
    );
}