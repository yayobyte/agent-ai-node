import { City } from "./weatherHelper";

export const renderTemplate = (city: City, weatherInfo: string, response: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat Response</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header bg-primary text-white">
                Weather Chat for ${city}
            </div>
            <div class="card-body">
                <div class="alert alert-info">
                    <pre>${JSON.stringify(weatherInfo, null, 2)}</pre>
                </div>
                <div class="chat-message">
                    ${response}
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;

export const renderErrorTemplate = (errorMessage: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <div class="alert alert-danger">
            <h4>Error</h4>
            <p>${errorMessage}</p>
        </div>
    </div>
</body>
</html>
`;