echo "=============================================="
echo "============ BUILDING THE SERVER ============="
echo "=============================================="
echo ""

cd ./ImgurClone/server
./scripts/build.sh -d="localhost:5000/imgurclone" -sp="" -ip="" -bp="https"

echo "=============================================="
echo "============ BUILDING THE CLIENT ============="
echo "=============================================="
echo ""

cd ../client
./scripts/build.sh
