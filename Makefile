#
# StromDAO Business Object - Decentralized Apps
# Deployment via Makefile to automate general Quick Forward 
#

PROJECT = "STROMDAO Website"


all:  generate commit

generate: ;hexo generate;

commit: ;git add -A && git commit -a && git push;
