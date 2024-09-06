
[Environment]::SetEnvironmentVariable("CompanyName", "$env:CompanyName", "Machine")
[Environment]::SetEnvironmentVariable("CompanyAcronym", "$env:CompanyAcronym", "Machine")
[Environment]::SetEnvironmentVariable("ConnectionString", "$env:ConnectionString", "Machine")
[Environment]::SetEnvironmentVariable("NodeID", "$env:NodeID", "Machine")

$ServiceName = 'SystemCenter';
$ConfigFile = 'C:/Program Files/SystemCenter/SystemCenter.StatusLog.txt'
Write-Host "Starting $ServiceName" 
net start $ServiceName
Write-Host "Started $ServiceName"

get-content "$ConfigFile" -tail 1 -wait
