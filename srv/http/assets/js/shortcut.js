// keyboard controls
$( document ).keydown( function( e ) {
	if ( G.local || !$( '#infoOverlay' ).hasClass( 'hide' ) ) return
	
	var key = e.key;
	
	if ( [ 'ArrowUp', 'ArrowDown' ].indexOf( key ) !== -1 ) {
		e.preventDefault();
		if ( G.library ) {
			var $index = $( '#lib-index1' ).css( 'display' ) === 'none' ? $( '#lib-index' ) : $( '#lib-index1' );
		} else {
			var $index = $( '#pl-index' );
		}
		var $indexedbgr = $index.find( '.indexed.bgr' );
		if ( $indexedbgr.length ) {
			if ( key === 'ArrowUp' ) {
				if ( $indexedbgr.index() ) {
					$indexedbgr.prevAll( '.indexed' ).eq( 0 ).addClass( 'bgr' );
				} else {
					$index.find( '.indexed:last' ).addClass( 'bgr' );
				}
			} else {
				if ( $indexedbgr.index() !== $index.find( '.indexed:last' ).index() ) {
					$indexedbgr.nextAll( '.indexed' ).eq( 0 ).addClass( 'bgr' );
				} else {
					$index.find( 'a:eq( 0 )' ).addClass( 'bgr' );
				}
			}
			$indexedbgr.removeClass( 'bgr' );
			return
		}
	}
	
	if ( key === 'Enter' ) {
		if ( !$( '#settings' ).hasClass( 'hide' ) ) {
			var $menu = $( '#settings' ).find( 'a.active' );
			if ( !$menu.length ) $menu = $( '#settings' ).find( '.submenu.active' );
			var href = $menu.prop( 'href' );
			href ? location.href = href : $menu.click();
			return
		} else if ( $( '.indexed.bgr' ).length ) {
			$( '.indexed.bgr' ).click();
			return
		}
	}
	
	if ( !$( '#colorpicker' ).hasClass( 'hide' ) ) return

	if ( key === 'Escape' ) {
		if ( $( '.menu:not(.hide)' ).length ) {
			$( '.menu' ).addClass( 'hide' );
			if ( typeof colorpicker !== 'undefined' ) $( '#colorcancel' ).click();
		} else {
			$( '#button-settings' ).click();
		}
		return
	}
		
	if ( key === 'Control' ) {
		if ( G.library ) {
			var $index = $( '#lib-index1' ).css( 'display' ) === 'none' ? $( '#lib-index' ) : $( '#lib-index1' );
		} else {
			var $index = $( '#pl-index' );
		}
		if ( $index.find( '.indexed' ).length === 1 ) return
		
		var $indexedbgr = $index.find( '.indexed.bgr' );
		if ( $indexedbgr.length ) {
			$indexedbgr.removeClass( 'bgr' );
		} else {
			$index.find( 'a:eq( 0 )' ).addClass( 'bgr' );
		}
		return
	}
			
	var keyevent = {
		  AudioVolumeDown    : 'voldn'
		, AudioVolumeMute    : 'volmute'
		, AudioVolumeUp      : 'volup'
		, MediaNextTrack     : 'next'
		, MediaPause         : 'pause'
		, MediaPlay          : 'play'
		, MediaPreviousTrack : 'previous'
		, MediaStop          : 'stop'
		, MediaTrackPrevious : 'previous'
		, MediaTrackNext     : 'next'
	}
	if ( ( key === ' ' && e.target.localName !== 'input' ) || key === 'MediaPlayPause' ) {
		var btn = G.status.state === 'play' ? ( G.status.webradio ? 'stop' : 'pause' ) : 'play';
		$( '#'+ btn ).click();
		e.preventDefault();
		return
		
	} else if ( key === 'Tab' ) {
		e.preventDefault();
		if ( G.library ) {
			$( '#tab-playback' ).click();
		} else if ( G.playback ) {
			$( '#tab-playlist' ).click();
		} else {
			$( '#tab-library' ).click();
		}
		return
		
	} else {
		$( '#'+ keyevent[ key ] ).click();
		if ( key.slice( 5 ) === 'Media' ) return
		
	}
	// context menu
	var $contextmenu = $( '.contextmenu:not( .hide )' );
	if ( !$contextmenu.length ) $contextmenu = $( '#settings:not( .hide )' );
	if ( $contextmenu.length ) {
		if ( G.library ) {
			var $liactive = $( '#lib-list li.active' );
		} else if ( G.playlist ) {
			if ( !G.savedlist ) {
				var $liactive = $( '#pl-list li.updn' );
				if ( !$liactive.length ) $liactive = $( '#pl-list li.active' );
			} else {
				var $liactive = $( '#pl-savedlist li.active' );
			}
		}
		var $menuactive = $contextmenu.find( 'a.active' );
		var $menufirst = $contextmenu.find( 'a:not( .hide ):eq( 0 )' );
		var $menulast = $contextmenu.find( 'a:not( .hide )' ).last();
		if ( key === 'ArrowLeft' ) {
			if ( $( '.submenu.active' ).length ) {
				$( '.submenu.active' )
					.removeClass( 'active' )
					.prev().addClass( 'active' );
			} else {
				$( '.menu' ).addClass( 'hide' )
				$menuactive.removeClass( 'active' );
				$( '.submenu' ).removeClass( 'active' );
				if ( G.playlist ) $( '#pl-list li' ).removeClass( 'lifocus' );
			}
		} else if ( key === 'ArrowRight' ) {
			var $next = $menuactive.next();
			if ( $next.hasClass( 'submenu' ) ) {
				$menuactive.removeClass( 'active' );
				$next.addClass( 'active' );
			}
		} else if ( key === 'ArrowUp' || key === 'ArrowDown' ) {
			if ( $( '.submenu.active' ).length ) {
				$menuactive = $( '.submenu.active' );
				if ( key === 'ArrowDown' ) {
					$next = $menuactive.nextAll( 'a:not( .hide ):eq( 0 )' );
					if ( !$next.length ) $next = $menuactive.prevAll( 'a:not( .hide )' ).last();
				} else {
					$next = $menuactive.prevAll( 'a:not( .hide ):eq( 1 )' );
					if ( !$next.length ) $next = $menuactive.nextAll( 'a:not( .hide )' ).last();
				}
				$next.addClass( 'active' );
				$menuactive.removeClass( 'active' );
				return
			}
			
			if ( !$menuactive.length ) {
				$menufirst.addClass( 'active' );
			} else {
				$menuactive.removeClass( 'active' );
				$( '.submenu' ).removeClass( 'active' );
				if ( key === 'ArrowDown' ) {
					if ( $menuactive.is( $menulast ) ) {
						$menufirst.addClass( 'active' );
					} else {
						$menuactive.nextAll( 'a:not( .hide ):eq( 0 )' ).addClass( 'active' );
					}
				} else {
					if ( $menuactive.is( $menufirst ) ) {
						$menulast.addClass( 'active' );
					} else {
						$menuactive.prevAll( 'a:not( .hide ):eq( 0 )' ).addClass( 'active' );
					}
				}
			}
		} else if ( key === 'Enter' ) { // context menu
			if ( $( '.menu:not(.hide)' ).length ) $contextmenu.find( '.active' ).click();
		}
		return
	}
	
	if ( G.playback ) {
		if ( key === 'ArrowLeft' ) {
			$( '#previous' ).click();
		} else if ( key === 'ArrowRight' ) {
			$( '#next' ).click();
		} else if ( key === 'ArrowUp' ) {
			$( '#volup' ).click();
		} else if ( key === 'ArrowDown' ) {
			$( '#voldn' ).click();
		}
	} else if ( G.library ) {
		if ( !$( '#lib-search' ).hasClass( 'hide' ) ) return
		
		// home /////////////////////////////////////////
		if ( !$( '#lib-mode-list' ).hasClass( 'hide' ) ) {
			var $blupdn = $( '.lib-mode.updn' );
			if ( !$blupdn.length ) {
				$( '.lib-mode:not( .hide ):eq( 0 )' ).addClass( 'updn' );
				return
			}
			
			if ( key === 'ArrowLeft' ) {
				var $div = $( '.lib-mode.updn' ).prevAll( ':not( .hide ):eq( 0 )' );
				$( '.lib-mode' ).removeClass( 'updn' );
				if ( !$div.length ) $div = $( '.lib-mode:not( .hide )' ).last();
				$div.addClass( 'updn' );
			} else if ( key === 'ArrowRight' ) {
				var $div = $( '.lib-mode.updn' ).nextAll( ':not( .hide ):eq( 0 )' );
				$( '.lib-mode' ).removeClass( 'updn' );
				if ( !$div.length ) $div = $( '.lib-mode:not( .hide ):eq( 0 )' );
				$div.addClass( 'updn' );
			} else if ( key === 'Enter' ) {
				$( '.lib-mode.updn .mode' ).click();
			}
			return
		}
		
		if ( key === 'ArrowLeft' ) { // back button
			$( '#button-lib-back' ).click();
			return
		} else if ( key === 'ArrowRight' ) { // show context menu
			$( '#lib-list li.active .lib-icon' ).tap();
			return
		}
		
		// list ///////////////////////////////////////
		if ( key === 'ArrowUp' || key === 'ArrowDown' ) {
			scrollUpDown( $( '#lib-list' ), key );
		} else if ( key === 'Enter' ) {
			var $liactive = $( '#lib-list li.active' );
			if ( $( '.licover' ).length || $( '#lib-list li.mode-webradio' ).length ) {
				if ( $( '.menu:not(.hide)' ).length ) { // context menu
					var menu = $liactive.find( '.lib-icon' ).data( 'target' );
					$( menu ).find( 'a:eq( 1 )' ).click();
				}
			} else {
				$liactive.tap();
			}
		}
		$( '.contextmenu' ).addClass( 'hide' );
	} else if ( G.playlist ) {
		if ( G.savedplaylist || G.savedlist ) {
			if ( key === 'ArrowUp' || key === 'ArrowDown' ) {
				scrollUpDown( $( '#pl-savedlist' ), key );
			} else if ( key === 'ArrowRight' ) {
				$( '#pl-savedlist li.active .pl-icon' ).click();
			} else if ( key === 'Enter' ) {
				$( '#pl-savedlist li.active' ).click();
			} else if ( key === 'ArrowLeft' ) {
				if ( !$( '.contextmenu:not( .hide )' ).length ) $( '#button-pl-back' ).click();
			}
		} else {
			if ( key === 'ArrowUp' || key === 'ArrowDown' ) {
				var $liactive = $( '#pl-list li.updn' );
				if ( !$liactive.length ) $( '#pl-list li.active' ).addClass( 'updn' );
				scrollUpDown( $( '#pl-list' ), key );
			} else if ( key === 'ArrowRight' ) {
				$( '#pl-list li.updn' ).length ? $( '#pl-list li.updn .pl-icon' ).click() : $( '#pl-list li.active .pl-icon' ).click();
			} else if ( key === 'Enter' ) {
				$( '#pl-list li.updn' ).click();
			} else if ( key === 'Delete' ) {
				$( '#button-pl-clear' ).click();
			}
		}
	}
} );
function scrollUpDown( $list, key ) {
	var $li = $list.find( 'li' );
	var $liactive = $list.find( 'li.active' );
	if ( !$liactive.length ) {
		$li.first().addClass( 'active' );
		setTimeout( function() {
			$( 'html, body' ).scrollTop( 0 );
		}, 300 );
		return
	}
	
	var classactive = 'active';
	if ( $list.prop( 'id' ) === 'pl-list' ) {
		$liactive = $list.find( 'li.updn' );
		classactive = 'updn';
	}
	var $linext = key === 'ArrowUp' ? $liactive.prev( 'li' ) : $liactive.next( 'li' );
	$liactive.removeClass( classactive );
	if ( !$linext.length ) {
		if ( key === 'ArrowUp' ) {
			$linext = $li.last();
			$( 'html, body' ).scrollTop( $linext.offset().top );
		} else {
			$linext = $li.first();
			$( 'html, body' ).scrollTop( 0 );
		}
		$linext.addClass( classactive );
		return
	}
	
	$linext.addClass( classactive );
	setTimeout( function() {
		var litop = $linext[ 0 ].getBoundingClientRect().top;
		var libottom = $linext[ 0 ].getBoundingClientRect().bottom;
		if ( key === 'ArrowUp' ) {
			if ( libottom > window.innerHeight - 40 || litop < 80 ) $( 'html, body' ).scrollTop( $linext.offset().top - window.innerHeight + 89 );
		} else {
			if ( libottom > window.innerHeight - 40 ) $( 'html, body' ).scrollTop( $linext.offset().top - 80 );
		}
	}, 300 );
}