$entries=$1
$file=$2
awk -v var="$entries" 'BEGIN {print var}'
awk 'BEGIN { cntr = $entries } /XX/ { cntr-- ; print cntr } !/XX/ { print $0 }' $file
