#!/bin/sh
cd `dirname $0`
basepath=$(pwd)

svn up

echo "==============build [fis3Andvue2] start================"

rm -rf output
jello release -cmpouDd output
rm -rf output/test
ls output
echo "==============build end , the outout file is================"
echo "$basepath/output"
echo "============================================================"

