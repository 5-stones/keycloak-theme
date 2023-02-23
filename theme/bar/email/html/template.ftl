<#macro emailLayout>
<html>
    <body style="background: #141414; font-size: 16px;">
        <div style="background: #141414; font-size: 16px; padding-top: 40px; padding-bottom: 80px;">
            <div style="max-width: 600px; margin: auto;">
                <div  style="background: #FFFFFF; border-radius: 5px; padding: 40px; margin-top: 20px; margin-bottom: 20px;">
                    <#nested>
                </div>
            </div>
        </div>
    </body>
</html>
</#macro>
