# Patricio PERPETUA Angular Web

## OVERVIEW

This project contains my personal web page [patricioperpetua.com](patricioperpetua.com). It is generated using Angular and deployed to Amazon Amplify.

> The **main repository** is hosted in [gitlab.com](https://gitlab.com/patricioperpetua/web) but it is automaticaly mirrored to [github.com](https://github.com/patricioperpetua/web.git). If you are in the Github page it may occur that is not updated to the last version.

This web is also deployed to gitlab pages, you can check it in [https://patricioperpetua.gitlab.io/web/](https://patricioperpetua.gitlab.io/web/)

### STRUCTURE

This web load my personal resume generated in html format and in pdf [(see this repository to more info)](https://gitlab.com/patricioperpetua/resume). Also allows to download it and see more information about my projects.

## BRANCHING MODEL

* Default branch when pull is **DEVELOP**.
* Master branch is protected and it is not possible to push. Create a merge request instead.

## DEPLOYMENT

For each commit to master branck it will deploy to amazon Amplify.

### CONFIGURATION

#### AMAZON Amplify

Follow [this guide](https://support.infinitewp.com/support/solutions/articles/212258-where-are-my-amazon-s3-credentials-) to create a bucket inside amazon s3 and create a user with read and write access. Then save the **Access key ID and Secret access key** as
 following: **AMAZON_S3_RESUME_WR_ACCESS_KEY_ID** and **AMAZON_S3_RESUME_WR_SECRET_ACCESS_KEY**.

### LOCATIONS OF FILES

* **MASTER BRANCH:** under path /latest/

* **DEVELOP BRANCH:** under path /develop/

* **TAGS:** under path /${TAG_NAME}/

## DOCKER IMAGES

The image name is: **patricioperpetua/web**. [See Registry](https://gitlab.com/patricioperpetua/web/container_registry). Tags are the same names as files locations described above.

The image is based of an nginx image to display the static web page.

## TODO

* [ ] Change scripts from bash to nodejs.
* [ ] Document how to use repository.
* [ ] Config gitlab ci/cd.
* [ ] Add amazon amplify deployer.
* [ ] Add docker support.

----------------------

© [Patricio Perpetua](http://patricioperpetua.com), Italy, 2019.
