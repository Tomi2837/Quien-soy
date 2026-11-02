<?php
/**
 * Snippet "Demos a pantalla completa (páginas con HTML completo, sin tema)"
 * Instalado en nalta.com.ar con el plugin Code Snippets (ID 37, alcance: front-end, prioridad 1).
 *
 * Toda página cuyo contenido sea un documento HTML completo (empieza con <!doctype html>,
 * por ejemplo pegado en un bloque "HTML personalizado") se muestra tal cual: sin encabezado
 * del tema, barra de WordPress ni botones flotantes. Las páginas normales no se ven afectadas.
 * Para una demo nueva alcanza con crear la página y pegar el HTML: no hay que tocar este código.
 */
add_action( 'template_redirect', function () {
	if ( ! is_page() ) {
		return;
	}
	$html = get_post_field( 'post_content', get_queried_object_id(), 'raw' );
	// Solo páginas cuyo contenido es un documento HTML completo (las demos)
	if ( ! preg_match( '/^\s*(<!-- wp:html -->\s*)?<!doctype html/i', $html ) ) {
		return;
	}
	// Quitar el envoltorio del bloque HTML de Gutenberg
	$html = preg_replace( '/^\s*<!-- wp:html -->\s*/', '', $html );
	$html = preg_replace( '/\s*<!-- \/wp:html -->\s*$/', '', $html );
	status_header( 200 );
	header( 'Content-Type: text/html; charset=UTF-8' );
	echo $html;
	exit;
}, 0 );
