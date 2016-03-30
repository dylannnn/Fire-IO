# Fire IO
Fire IO is a themeable real-time CMS that can be hosted in a static enviornment (such as GitHub pages). This means you can edit your website all within your GitHub page url (without pushing or manually editing files) for free (Unless you go over the free plan for Firebase). This is the current [milestone](https://github.com/Stackoverload/Fire-IO/milestones/v0.1%20release)

[demo](https://fireio.firebaseapp.com/#/admin) (Hosted on Firebase CDN)

Note, this project isn't in release yet so there's no security settings yet.

#Features:
------
<ul>
<li>Custom navigation</li>
<li>Custom pages</li>
<li>Blog posting</li>
<li><a href="https://github.com/Stackoverload/Fire-IO-Mobile">Mobile client</a></li>
</ul>

#Coming soon:
------
<ul>
<li>Commenting system</li>
</ul>

#Configuring:
------
```
This project isn't ready for release, there is not any security rules nor is there a valid admin account.
Please, please, PLEASE do not use this project yet. But if you'd like to configure it for testing, simply
visit js/config.js and edit the property 'fb' to be your firebase url.
```

#Styling:
------
```
Want a cleaner blog / site design? It's really simple to do. Simply open up the templates folder, 
and everything you need will be in there. The content of every page (Posts, Navigation, Comments,
etc.) are all inside the templates/directives folder. The outside of the content (for structing the
layout) is inside templates/content, and for the admin templates/admin.  
```
#Admin [login](https://fireio.firebaseapp.com/#/login):
------
```
Email: admin@admin.com
Password: admin
```
