rmdir /s /q "PartialViews"
xcopy "../Dtvl.Pvs.Wiki/PartialViews" "PartialViews" /E /I /Y
dotnet build 
dotnet nuget push -s https://nuget.dtvl.com.tw -k %NUGET_API_KEY% bin/Debug/Dtvl.Pvs.1.0.0.nupkg

pause