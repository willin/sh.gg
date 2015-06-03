publish:
	rm -rf public
	hexo g
	./ghp-import public -p -m 'Willin Auto Publisher'
	./ghp-import public -r gitcafe -b gitcafe-pages -p -m 'Willin Auto Publisher'
	rm -rf public