#!/bin/sh
cd `dirname $0`
basepath=$(pwd)

svn up

echo "==============build [common] start================"

rm -rf output
jello release -cpouDd output
rm -rf output/test
ls output
echo "==============build end , the outout file is================"
echo "$basepath/output"
echo "============================================================"


echo "==============generate log code for old system========="

cat "$basepath/output/static/common/js/mod.js" "$basepath/output/static/common/pkg/log.js" > "$basepath/output/log.js"

rm -rf output/static output/WEB-INF
echo "==============generate log.js ok the file is=========="
echo "$basepath/output/log.js"
echo "==========================================================="
