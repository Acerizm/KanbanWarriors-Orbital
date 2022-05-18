//using Microsoft.AspNetCore.Builder;
//using Microsoft.AspNetCore.Hosting;
//using Microsoft.AspNetCore.Mvc;
////using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.DependencyInjection;
//using Swashbuckle.AspNetCore.Swagger;
//using System.Reflection;
//using System.IO;
//using System;
//using back_end.Services;


//namespace InspirousBE
//{
//    public class DepreciatedFile
//    {
//        public DepreciatedFile(IConfiguration configuration)
//        {
//            Configuration = configuration;
//        }

//        public IConfiguration Configuration { get; }

//        // This method gets called by the runtime. Use this method to add services to the container.
//        public void ConfigureServices(IServiceCollection services)
//        {
//            services.AddScoped<BackgroundImagesServices>();
//            services.AddCors();
//            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

//            // Register the Swagger generator, defining 1 or more Swagger documents
//            services.AddSwaggerGen(c =>
//            {
//                c.SwaggerDoc("v1", new Info
//                {
//                    Version = "v0.1",
//                    Title = "KanbanWarriors API Documentation",
//                    Description = "KanbanWarriors API",
//                    TermsOfService = "None",
//                    Contact = new Contact
//                    {
//                        Name = "Haiqel",
//                        Email = "e0727011@u.nus.edu",
//                        Url = "https://www.linkedin.com/in/haiqelhanaffi/"
//                    },
//                    License = new License
//                    {
//                        Name = "MIT",
//                        Url = "https://en.wikipedia.org/wiki/MIT_License"
//                    }
//                });

//                //Set the comments path for the Swagger JSON and UI.

//                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
//                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
//                c.IncludeXmlComments(xmlPath);
//            });
//        }

//        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
//        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
//        {
//            app.UseStaticFiles();

//            // Enable middleware to serve generated Swagger as a JSON endpoint.
//            app.UseSwagger();

//            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
//            // specifying the Swagger JSON endpoint.
//            app.UseSwaggerUI(c =>
//            {
//                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Inspirous API Documentation V1");
//            });

//            app.UseCors(builder =>
//            {
//                //Change the main front-end website here
//                builder.WithOrigins("http://159.223.91.154:3000").AllowAnyHeader();
//                builder.WithOrigins("http://159.223.91.154:3000").AllowAnyMethod();
//                builder.WithOrigins("http://159.223.91.154:3000").AllowAnyOrigin();

//                //for our localhost
//                builder.WithOrigins("http://localhost:3000").AllowAnyHeader();
//                builder.WithOrigins("http://localhost:3000").AllowAnyMethod();
//                builder.WithOrigins("http://localhost:3000").AllowAnyOrigin();
//            });

//            // Handling errors here
//            // PLEASE REMOVE LINE 87-96 WHEN PRODUCTION
//            if (env.IsDevelopment())
//            {
//                app.UseDeveloperExceptionPage();
//            }
//            else
//            {
//                app.UseDeveloperExceptionPage();
//                //app.UseExceptionHandler("/Error");
//                //app.UseHsts();
//            }

//            app.UseMvc();
//        }
//    }
//}