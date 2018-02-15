MirrorConf 2018
===============

Welcome to the MirrorConf's 2018 edition landing page.

MirrorConf is a conference that aims to blur the differences and point towards
a collaborative future between designers and front-end developers.

In 2018, our theme was _The Future of the Web_. And since our future is shaped
by our past, we made our website into a travel through time. We look at a
bright future full of potential, but we honor the past it is built upon. The
simple lessons of the first massively popular pages in the nineties (long
before CSS was a thing), the fluorescent extravagances of the eighties arcade
dreams, the inventions that harness electricity and its power to revolutionize
how we communicate, the ageless influence of the written word to shape
societies, the dream-filled civilizations that preceded us in trying to
understand the universe, all the way back to the humble beginnings of mankind
learning to paint its thoughts in stone.

This event is now part of that past, but the code that allowed us to create this
journey is now free for anyone to build a new future. :sparkles:


**Table of Contents**

* [Setup](#setup)
* [Development](#development)
* [Deployment](#deployment)
* [Contribution Guidelines](#contribution-guidelines)
* [About](#about)


Setup
-----

After cloning this project, simply run the `bin/setup` script:

```
git clone git@github.com:subvisual/2018.mirrorconf.com.git
cd 2018.mirrorconf.com
bin/setup
```

This script will install the required language versions using
[asdf-vm][asdf-vm], so make sure you have it installed. It will then install
[Yarn][yarn] and use it to install all the required dependencies.


Development
-----------

To start a development server run:

```
bin/server
```

This will start the Gatsby application, which serves the site for preview at
[https://localhost:8000](https://localhost:8000) (by default), automatically
compiling the files as you change them, and automatically refreshing the page
in the browser.


Deployment
----------

[https://2018.mirrorconf.com](https://2018.mirrorconf.com) is hosted on [AWS
S3][aws-s3], and distributed world-wide through [AWS
CloudFront][aws-cloudfront]. We also have a staging environment that has now
been decommissioned.

Assuming a similar setup, run `yarn run deploy-production` to deploy the site
to production. Similarly, `deploy-staging` will deploy the site to staging.

Both scripts have been sanitized in [package.json](./package.json), make sure
to set the appropriate values for the bucket name and distribution ID in each
script.


Contribution Guidelines
-----------------------

Since the event is now behind us, we are not very interested in accepting any
contributions to this project. In any case, if you feel there is something
worth addressing, feel free to [create a pull-request][new-pull-request], or
[open an issue][new-issue] if you're not sure how to address it. We usually
respond to any queries in a matter of days, at most.

Any contributions must follow [Subvisual's guides][guides] ([even if we
didn't][scout-rule]).


About
-----

[2018.mirrorconf.com][repo] is maintained by [Subvisual][subvisual].

[![Subvisual](https://raw.githubusercontent.com/subvisual/guides/master/github/templates/subvisual_logo_with_name.png)][subvisual]

It is published under the [Apache License 2.0](./LICENSE). You are free to fork
this project and build upon it. We ask only that you give us some credit and
state which changes are yours.

If you build something with this project, we would love to hear about it. :heart:


[asdf-vm]: https://asdf-vm.com/
[aws-cloudfront]: https://aws.amazon.com/cloudfront/
[aws-s3]: https://aws.amazon.com/s3/
[guides]: https://github.com/subvisual/guides
[new-issue]: https://github.com/subvisual/2018.mirrorconf.com/issues/new
[new-pull-request]: https://github.com/subvisual/2018.mirrorconf.com/compare
[repo]: https://github.com/subvisual/2018.mirrorconf.com
[scout-rule]: https://medium.com/@biratkirat/step-8-the-boy-scout-rule-robert-c-martin-uncle-bob-9ac839778385
[subvisual]: https://subvisual.com
[yarn]: https://yarnpkg.com
