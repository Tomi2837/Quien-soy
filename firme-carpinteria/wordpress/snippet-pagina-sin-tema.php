<?php
/**
 * Snippet "Demo Firme Carpintería: página 1384 a pantalla completa (sin tema)"
 * Instalado en nalta.com.ar con el plugin Code Snippets (ID 37, alcance: front-end, prioridad 1).
 *
 * Muestra la demo HTML guardada en la página 1384 tal cual: sin encabezado del tema,
 * barra de WordPress ni botones flotantes. Para volver a la página normal, desactivá
 * el snippet en Fragmentos de código. Para otra demo, cambiá el ID de la página.
 */
add_action( 'template_redirect', function () {
	// Solo la página de la demo (ID 1384)
	if ( ! is_page( 1384 ) ) {
		return;
	}
	$html = get_post_field( 'post_content', 1384, 'raw' );
	// Quitar el envoltorio del bloque HTML de Gutenberg
	$html = preg_replace( '/^\s*<!-- wp:html -->\s*/', '', $html );
	$html = preg_replace( '/\s*<!-- \/wp:html -->\s*$/', '', $html );
	// Si no es un documento HTML completo, dejar que WordPress muestre la página normal
	if ( stripos( $html, '<html' ) === false ) {
		return;
	}
	status_header( 200 );
	header( 'Content-Type: text/html; charset=UTF-8' );
	echo $html;
	exit;
}, 0 );
