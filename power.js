   
    var fileChooser = document.getElementById('file-chooser');
    var button = document.getElementById('upload-button');
    var results = document.getElementById('results');
    button.addEventListener('click', function () {
        var file = fileChooser.files[0];
        if (file) {            
            AWS.config.update({
                "accessKeyId": "[SECRET KEY]",
                "secretAccessKey": "[SECRET ACCESS KEY]",
                "region": "us-east-1"
            });
            var s3 = new AWS.S3();
            var params = {
                Bucket: '[YOUR-BUCKET]',
                Key: file.name,
                ContentType: file.type,
                Body: file,
                ACL: 'public-read'
            };        
            s3.putObject(params, function (err, res) {
                if (err) {
                    results.innerHTML = ("Error uploading data: ", err);
                } else {
                    results.innerHTML = ("Successfully uploaded data");
                }
            });
        } else {
            results.innerHTML = 'Nothing to upload.';
        }
    }, false);
