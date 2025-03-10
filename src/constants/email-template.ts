export const resetTemplate = (resetUrl: string) => `<!DOCTYPE html>
<html dir="rtl">
<head>
    <meta name="x-apple-disable-message-reformatting">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @font-face {
            font-family: 'notosansarabic';
            src: url('https://fonts.gstatic.com/s/notosansarabic/v28/nwpCtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlj4wv4rqxzLI.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
        }

        /* Add responsive styles */
        @media screen and (max-width: 600px) {
            .outer-container {
                width: 95% !important;
            }
            .inner-table {
                width: 100% !important;
            }
            .logo-image {
                width: 120px !important;
                height: 120px !important;
            }
            .content-padding {
                padding: 1rem !important;
            }
            .main-content {
                padding: 1rem !important;
            }
            .partners-image {
                height: auto !important;
            }
            .colored-drop {
                width: 42px !important;
                height: 27px !important;
            }
        }
    </style>
</head>
<body style="font-family: 'notosansarabic', sans-serif; margin: 0; padding: 0; background-color: #f8f9fa;">
<div class="outer-container" style="width:70%; margin-left:auto; margin-right:auto; background: #ffffff; padding: 2rem 0;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" class="inner-table" style="width:70%; margin-left:auto; margin-right:auto;">
        <tr>
            <td align="center" class="content-padding" style="padding: 2rem 1rem;">
                <!-- Logo -->
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                        <td style="text-align: center; padding: 16px;">
                            <img src="https://kedan-dashboard.org/logo.png" alt="" class="logo-image" width="176"  style="display: block; margin: 0 auto;">
                        </td>
                    </tr>
                </table>

                <!-- Green Container -->
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #00AE84; border-radius: 12px; margin-top: 1rem;">
                    <tr>
                        <td style="padding: 1rem;">
                            <h1 style="color: white; text-align: center; margin: 0.5rem 0; font-size: 1.5rem;">
                                إعادة تعيين كلمة المرور
                            </h1>
                        </td>
                    </tr>
                </table>

                <!-- Main Content Section -->
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); margin-top: 1.5rem; border: 1px solid #edf2f7;">
                    <tr>
                        <td class="main-content" style="padding: 2.5rem;">
                            <p style="color: #4B5563; text-align: center; margin-bottom: 2rem; font-size: 1.125rem; line-height: 1.6;">
                                لقد تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بك. اضغط على الزر
                                أدناه لإعادة تعيينها.
                            </p>
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                    <td align="center">
                                        <a href="${resetUrl}" style="
                                            font-size: 1.125rem;
                                            background-color: #00AE84;
                                            color: white;
                                            padding: 0.875rem 2rem;
                                            border-radius: 8px;
                                            text-decoration: none;
                                            display: inline-block;
                                            margin-bottom: 2rem;
                                            font-weight: 500;
                                            transition: background-color 0.2s ease;">
                                            إعادة تعيين كلمة المرور
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            <p style="color: #718096; text-align: center; font-size: 0.875rem; margin-top: 1rem;">
                                إذا لم تقم بطلب إعادة تعيين كلمة المرور، يمكنك تجاهل هذا البريد الإلكتروني.
                            </p>
                        </td>
                    </tr>
                </table>  
            </td>
        </tr>
    </table>
</div>
</body>
</html>`;

export const resetOTPTemplate = (otp: string) => `<!DOCTYPE html>
<html dir="rtl">
<head>
    <meta name="x-apple-disable-message-reformatting">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @font-face {
            font-family: 'notosansarabic';
            src: url('https://fonts.gstatic.com/s/notosansarabic/v28/nwpCtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlj4wv4rqxzLI.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
        }
        
        /* Add responsive styles */
        @media screen and (max-width: 600px) {
            .outer-container {
                width: 95% !important;
            }
            .inner-table {
                width: 100% !important;
            }
            .logo-image {
                width: 120px !important;
                height: 120px !important;
            }
            .content-padding {
                padding: 1rem !important;
            }
            .main-content {
                padding: 1rem !important;
            }
            .partners-image {
                height: auto !important;
            }
            .colored-drop {
                width: 42px !important;
                height: 27px !important;
            }
        }
    </style>
</head>
<body style="font-family: 'notosansarabic', sans-serif; margin: 0; padding: 0; background-color: #f8f9fa;">
    <div class="outer-container" style="width:70%; margin-left:auto; margin-right:auto; background: #ffffff; padding: 2rem 0;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" class="inner-table" style="width:70%; margin-left:auto; margin-right:auto;">
            <tr>
                <td align="center" class="content-padding" style="padding: 2rem 1rem;">
                    <!-- Logo -->
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                            <td style="text-align: center; padding: 16px;">
                                <img src=https://kedan-dashboard.org/logo.png" alt="" class="logo-image" width="176" 
                style="display: block; margin: 0 auto;">
                            </td>
                        </tr>
                    </table>
                    
                    <!-- Green Container -->
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #00AE84; border-radius: 12px; margin-top: 1rem;">
                        <tr>
                            <td style="padding: 1rem;">
                                <h1 style="color: white; text-align: center; margin: 0.5rem 0; font-size: 1.5rem;">
                                    رمز التحقق لإعادة تعيين كلمة المرور
                                </h1>
                            </td>
                        </tr>
                    </table>
                    
                    <!-- Main Content Section -->
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); margin-top: 1.5rem; border: 1px solid #edf2f7;">
                        <tr>
                            <td class="main-content" style="padding: 2rem;">
                                <p style="color: #4B5563; text-align: center; margin-bottom: 2rem; font-size: 1.125rem; line-height: 1.6;">
                                    لقد تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بك. اليك رمز التحقق لحسابك.
                                </p>
                                <div style="text-align: center;">
                                    <span style="
                                        font-size: 1.5rem;
                                        background-color: #00AE84;
                                        color: white;
                                        padding: 0.75rem 2rem;
                                        border-radius: 8px;
                                        text-decoration: none;
                                        display: inline-block;
                                        margin-bottom: 2rem;
                                        font-weight: bold;
                                        letter-spacing: 2px;
                                    ">${otp}</span>
                                </div>
                                <p style="color: #718096; text-align: center; font-size: 0.875rem; margin-top: 2rem;">
                                    إذا لم تقم بطلب إعادة تعيين كلمة المرور، يمكنك تجاهل هذا البريد الإلكتروني.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>`;

export const addNewOrgTemplate = (props: {
    name: string;
    email: string;
    password: string;
  }) =>  `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @media screen and (max-width: 600px) {
            .outer-container {
                width: 95% !important;
                padding: 1.5rem !important;
            }
        }
                @font-face {
            font-family: 'notosansarabic';
            src: url('https://fonts.gstatic.com/s/notosansarabic/v28/nwpCtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlj4wv4rqxzLI.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
        }
    </style>
</head>
<body style="
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f8f9fa;
    color: #2c3e50;
">
    <div  style="
        width: 70%;
        margin: 2rem auto;
        background: white;
        padding: 2.5rem;
        text-align: right;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    ">
    <img src="https://kedan-dashboard.org/logo.png" alt="" class="logo-image" width="80" height="40">

        <div style="
            width: 100%;
            margin-bottom: 2rem;
            border-bottom: 3px solid #00AE84;
            padding-bottom: 1rem;
        ">
            <h1 style="
                color: #00AE84;
                margin: 0;
                font-size: 1.8rem;
                font-weight: 600;
            "> ${props.name} مرحباً</h1>
        </div>
        
        <p style="
            margin: 0.5rem 0;
            width: 100%;
            font-size: 16px;
            line-height: 1.6;
        ">تمت إضافة الجمعية إلى نظام لوح معلومات كدان٫ تفاصيل الحساب هي:</p>
        
        <div style="
            background-color: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            text-align:right;
            margin: 1.5rem;
            width: 90%;
            border: 1px solid #edf2f7;
        ">
            <p style="margin: 0.5rem 0;">
            <strong style="color: #00AE84">${props.email}</strong>
            البريد الإلكتروني: </p>
            <div style="text-align:right;
                display:inline-block;">
            <span style="
                background-color: #00AE84;
                color: white;
                padding: 0.5rem;
                border-radius: 6px;
                font-family: 'Courier New', monospace;
                font-size: 16px;
                text-align: center;
                margin: 0.5rem 0;
                letter-spacing: 1px;
            ">${props.password}</span>
                    <span style="margin: 1rem 0 0.5rem;">كلمة المرور المؤقتة:</span>

                </div>
        
        </div>
        
        <p style="
            color: #ef4444;
            font-weight: 600;
            margin: 1rem 0;
            width: 100%;
            padding: 0.75rem;
            background-color: #fef2f2;
            border-radius: 6px;
            border: 1px solid #fee2e2;
        ">يرجى تغيير كلمة المرور عند أول تسجيل دخول</p>
        
        <a href="https://kedan-dashboard.org" target="_blank" style="
            display: inline-block;
            background-color: #00AE84;
            color: white;
            text-decoration: none;
            padding: 0.75rem 2rem;
            border-radius: 6px;
            margin-top: 1.5rem;
            font-weight: 500;
            transition: background-color 0.2s ease;
        ">تسجيل الدخول</a>
        
        <div style="
            margin-top: 3rem;
            padding-top: 1.5rem;
            border-top: 1px solid #edf2f7;
            width: 100%;
            text-align: center;
            color: #718096;
            font-size: 14px;
        ">
            © جميع الحقوق محفوظة ${new Date().getFullYear()}
        </div>
    </div>
</body>
</html>`;

export const inviteMemberTemplate = (props: {
  name: string;
  email: string;
  password: string;
}) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @media screen and (max-width: 600px) {
            .outer-container {
                width: 95% !important;
                padding: 1.5rem !important;
            }
        }
                @font-face {
            font-family: 'notosansarabic';
            src: url('https://fonts.gstatic.com/s/notosansarabic/v28/nwpCtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlj4wv4rqxzLI.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
        }
    </style>
</head>
<body style="
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f8f9fa;
    color: #2c3e50;
">
    <div  style="
        width: 70%;
        margin: 2rem auto;
        background: white;
        padding: 2.5rem;
        text-align: right;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    ">
    <img src="https://kedan-dashboard.org/logo.png" alt="" class="logo-image" width="80" height="40">

        <div style="
            width: 100%;
            margin-bottom: 2rem;
            border-bottom: 3px solid #00AE84;
            padding-bottom: 1rem;
        ">
            <h1 style="
                color: #00AE84;
                margin: 0;
                font-size: 1.8rem;
                font-weight: 600;
            "> ${props.name} مرحباً</h1>
        </div>
        
        <p style="
            margin: 0.5rem 0;
            width: 100%;
            font-size: 16px;
            line-height: 1.6;
        ">تم إضافتك كعضو في الفريق. تفاصيل حسابك هي:</p>
        
        <div style="
            background-color: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            text-align:right;
            margin: 1.5rem;
            width: 90%;
            border: 1px solid #edf2f7;
        ">
            <p style="margin: 0.5rem 0;">
            <strong style="color: #00AE84">${props.email}</strong>
            البريد الإلكتروني: </p>
            <div style="text-align:right;
                display:inline-block;">
            <span style="
                background-color: #00AE84;
                color: white;
                padding: 0.5rem;
                border-radius: 6px;
                font-family: 'Courier New', monospace;
                font-size: 16px;
                text-align: center;
                margin: 0.5rem 0;
                letter-spacing: 1px;
            ">${props.password}</span>
                    <span style="margin: 1rem 0 0.5rem;">كلمة المرور المؤقتة:</span>

                </div>
        
        </div>
        
        <p style="
            color: #ef4444;
            font-weight: 600;
            margin: 1rem 0;
            width: 100%;
            padding: 0.75rem;
            background-color: #fef2f2;
            border-radius: 6px;
            border: 1px solid #fee2e2;
        ">يرجى تغيير كلمة المرور عند أول تسجيل دخول</p>
        
        <a href="#" style="
            display: inline-block;
            background-color: #00AE84;
            color: white;
            text-decoration: none;
            padding: 0.75rem 2rem;
            border-radius: 6px;
            margin-top: 1.5rem;
            font-weight: 500;
            transition: background-color 0.2s ease;
        ">تسجيل الدخول</a>
        
        <div style="
            margin-top: 3rem;
            padding-top: 1.5rem;
            border-top: 1px solid #edf2f7;
            width: 100%;
            text-align: center;
            color: #718096;
            font-size: 14px;
        ">
            © جميع الحقوق محفوظة ${new Date().getFullYear()}
        </div>
    </div>
</body>
</html>`;



export const inviteClientTemplate = (props: {
    name: string;
    email: string;
    password: string;
  }) => `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          @media screen and (max-width: 600px) {
              .outer-container {
                  width: 95% !important;
                  padding: 1.5rem !important;
              }
          }
          @font-face {
              font-family: 'notosansarabic';
              src: url('https://fonts.gstatic.com/s/notosansarabic/v28/nwpCtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlj4wv4rqxzLI.woff2') format('woff2');
              font-weight: 400;
              font-style: normal;
          }
      </style>
  </head>
  <body style="
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f8f9fa;
      color: #2c3e50;
  ">
      <div style="
          width: 70%;
          margin: 2rem auto;
          background: white;
          padding: 2.5rem;
          text-align: right;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      ">
          <img src="https://kedan-dashboard.org/logo.png" alt="" class="logo-image" width="80" height="40">
  
          <div style="
              width: 100%;
              margin-bottom: 2rem;
              border-bottom: 3px solid #00AE84;
              padding-bottom: 1rem;
          ">
              <h1 style="
                  color: #00AE84;
                  margin: 0;
                  font-size: 1.8rem;
                  font-weight: 600;
              ">مرحباً ${props.name}</h1>
          </div>
          
          <p style="
              margin: 0.5rem 0;
              width: 100%;
              font-size: 16px;
              line-height: 1.6;
          ">تمت إضافتكم ${props.name} كجمعية جديدة في النظام. تفاصيل الحساب هي:</p>
          
          <div style="
              background-color: #f8f9fa;
              padding: 1.5rem;
              border-radius: 8px;
              text-align: right;
              margin: 1.5rem;
              width: 90%;
              border: 1px solid #edf2f7;
          ">
              <p style="margin: 0.5rem 0;">
                  <strong style="color: #00AE84">${props.email}</strong>
                  البريد الإلكتروني: 
              </p>
              <div style="text-align: right;
                  display: inline-block;">
                  <span style="
                      background-color: #00AE84;
                      color: white;
                      padding: 0.5rem;
                      border-radius: 6px;
                      font-family: 'Courier New', monospace;
                      font-size: 16px;
                      text-align: center;
                      margin: 0.5rem 0;
                      letter-spacing: 1px;
                  ">${props.password}</span>
                  <span style="margin: 1rem 0 0.5rem;">كلمة المرور المؤقتة:</span>
              </div>
          </div>
          
          <p style="
              color: #ef4444;
              font-weight: 600;
              margin: 1rem 0;
              width: 100%;
              padding: 0.75rem;
              background-color: #fef2f2;
              border-radius: 6px;
              border: 1px solid #fee2e2;
          ">يرجى تغيير كلمة المرور عند أول تسجيل دخول</p>
          
          <a href="https://kedan-dashboard.org" style="
              display: inline-block;
              background-color: #00AE84;
              color: white;
              text-decoration: none;
              padding: 0.75rem 2rem;
              border-radius: 6px;
              margin-top: 1.5rem;
              font-weight: 500;
              transition: background-color 0.2s ease;
          ">تسجيل الدخول</a>
          
          <div style="
              margin-top: 3rem;
              padding-top: 1.5rem;
              border-top: 1px solid #edf2f7;
              width: 100%;
              text-align: center;
              color: #718096;
              font-size: 14px;
          ">
              © جميع الحقوق محفوظة ${new Date().getFullYear()}
          </div>
      </div>
  </body>
  </html>`;