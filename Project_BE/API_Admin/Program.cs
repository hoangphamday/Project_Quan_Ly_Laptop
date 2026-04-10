using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using BLL;
using BLL.Interfaces;
using DAL;
using DAL.Helper;
using DAL.Helper.Interfaces;
using DAL.Interfaces;

namespace API_Admin
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add CORS 
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader());
            });

            // 1. Configure JWT Authentication
            var appSettingsSection = builder.Configuration.GetSection("AppSettings");
            builder.Services.Configure<AppSetting>(appSettingsSection);

            var appSettings = appSettingsSection.Get<AppSetting>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);

            builder.Services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            // 2. Register IDatabaseHelper
            builder.Services.AddTransient<IDatabaseHelper, DatabaseHelper>();

            // 3. Register Repositories (DAL)
            builder.Services.AddTransient<ITaiKhoanRepository, TaiKhoanRepository>();
            builder.Services.AddTransient<IKhachHangRepository, KhachHangRepository>();
            builder.Services.AddTransient<ILaptopRepository, LaptopRepository>();
            builder.Services.AddTransient<IGioHangRepository, GioHangRepository>();
            builder.Services.AddTransient<IDonHangRepository, DonHangRepository>();
            builder.Services.AddTransient<IDanhGiaRepository, DanhGiaRepository>();
            builder.Services.AddTransient<IPhieuNhapRepository, PhieuNhapRepository>();
            builder.Services.AddTransient<INhanVienRepository, NhanVienRepository>();
            builder.Services.AddTransient<INhaCungCapRepository, NhaCungCapRepository>();
            builder.Services.AddTransient<IThongKeRepository, ThongKeRepository>();

            // 4. Register Services (BLL)
            builder.Services.AddTransient<ITaiKhoanService, TaiKhoanService>();
            builder.Services.AddTransient<IKhachHangService, KhachHangService>();
            builder.Services.AddTransient<ILaptopService, LaptopService>();
            builder.Services.AddTransient<IGioHangService, GioHangService>();
            builder.Services.AddTransient<IDonHangService, DonHangService>();
            builder.Services.AddTransient<IDanhGiaService, DanhGiaService>();
            builder.Services.AddTransient<IPhieuNhapService, PhieuNhapService>();
            builder.Services.AddTransient<INhanVienService, NhanVienService>();
            builder.Services.AddTransient<INhaCungCapService, NhaCungCapService>();
            builder.Services.AddTransient<IThongKeService, ThongKeService>();

            // Add services to the container.
            builder.Services.AddControllers();

            // 5. Configure Swagger / OpenAPI
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API_Admin Project_Laptop", Version = "v1" });

                // Thêm cấu hình UI JWT Token
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT Authorization header using the Bearer scheme. 
                      Enter 'Bearer' [space] and then your token.
                      Example: 'Bearer 12345abcdef'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        },
                        new List<string>()
                    }
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // Use CORS
            app.UseCors("AllowAll");

            // Kích hoạt JWT Authentication trước Authorization
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
