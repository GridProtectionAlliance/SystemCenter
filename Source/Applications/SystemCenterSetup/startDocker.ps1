
[Environment]::SetEnvironmentVariable("CompanyName", "$env:CompanyName", "Machine")
[Environment]::SetEnvironmentVariable("CompanyAcronym", "$env:CompanyAcronym", "Machine")
[Environment]::SetEnvironmentVariable("ConnectionString", "$env:ConnectionString", "Machine")
[Environment]::SetEnvironmentVariable("NodeID", "$env:NodeID", "Machine")


Write-Host "Starting SystemCenter"
$ServiceName = 'SystemCenter'; 
Restart-Service $ServiceName
Write-Host "Started SystemCenter"

get-content 'C:/Program Files/SystemCenter/SystemCenter.StatusLog.txt' -tail 1 -wait
