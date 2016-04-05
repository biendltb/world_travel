<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!-- HTML5 & CSS3 -->
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <title>World travel</title>
        <script src="http://maps.google.com/maps/api/js?sensor=false&libraries=places"></script>
        <script src="/assets/js/main_page_1.0.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
        <script src = "/assets/js/bootstrap.min.js" ></script>
        <link rel="stylesheet" href="/assets/css/main_page_1.0.css">
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
    </head>
    <body onload="initialize();">
        <div id="container">
            <div class="row">
                <div class="col-xs-4 col-lg-3" >
                    <div class="hidden-xs" id="search-content-area">
                            <div class="row">
                                <div class="col-xs-10" style="padding: 0px">
                                    <input type="search" class="form-control" placeholder="Search">
                                </div>
                                <div class="col-xs-2" style="padding: 0px">
                                    <button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>
                                </div>
                                
                            </div>
                            
                    </div>
                </div>
                <div class="col-xs-8 col-lg-9">
                </div>
            </div>
        </div>
        <div id="map"></div>
    </body>
</html>
