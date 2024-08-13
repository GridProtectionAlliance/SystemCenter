
[Environment]::SetEnvironmentVariable("CompanyName", "$env:CompanyName", "Machine")
[Environment]::SetEnvironmentVariable("CompanyAcronym", "$env:CompanyAcronym", "Machine")
[Environment]::SetEnvironmentVariable("ConnectionString", "$env:ConnectionString", "Machine")

Set-Content "C:/Program Files/SystemCenter/SystemCenter.exe.config" $(Get-Content "C:/Program Files/SystemCenter/SystemCenter.exe.config").Replace("env(USER:ConnectionString)", "$env:ConnectionString")


Write-Host "Starting SystemCenter"
$ServiceName = 'SystemCenter'; 


Restart-Service $ServiceName

$lastCheck = (Get-Date).AddSeconds(-2) 
while ($true) 
{ 
    Get-EventLog -LogName Application -Source "SystemCenter" -After $lastCheck | Select-Object TimeGenerated, EntryType, Message	 
    $lastCheck = Get-Date 
    Start-Sleep -Seconds 2 
}