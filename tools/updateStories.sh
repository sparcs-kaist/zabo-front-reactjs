ls src/components | while read line; do
    ls src/components/$line | xargs -I% yarn generate $line % 'y'
done
